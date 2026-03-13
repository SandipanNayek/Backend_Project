import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uplodCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponsse.js";
const registerUser = asyncHandler(async(req,res)=>{
  // get user details from frontend
  // validation - not empty
  // check if user already exist; username,email
  // check for images
  // check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove passs and refresh token field from response
  // check for user creation
  // return res

  const{fullname, email,username,password } =req.body

  console.log("email: ",email)
  console.log("FILES:", req.files)
  if([fullname, email,username,password ].some((field)=>
    field?.trim() ==="")
  ){
     throw new ApiError(400,"all fields are required");  
  }

  const existedUser =await User.findOne({
    $or:[{username},{email}]
  })

  if(existedUser){
    throw new ApiError(409,"user with email or username already exist")
  }

  const avatarLocalpath = req.files?.avatar?.[0]?.path
const coverimageLocalpath = req.files?.coverimage?.[0]?.path
  if(!avatarLocalpath){
    throw new ApiError(400,"Avatar file is required")
  }

  const avatar = await uplodCloudinary(avatarLocalpath)
  const coverimage = await uplodCloudinary(coverimageLocalpath)
  console.log("Cloudinary avatar response:", avatar)

  if(!avatar){
     throw new ApiError(400," Avatar is required");
  }
   const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverimage:coverimage?.url || "",
    email,
    password,
    username:username.toLowerCase()
   })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  

  if(!createdUser){
    throw new ApiError(500, "somethig went wrong")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered Successfully ")
  )

  
})
 
const generateAccessAndRefreshTokens = async(userId) =>{
  try {
      const user = await User.findById(userId)
      const accessToken = user.generateRefreshToken()
      const refreshToken =user.generateAccessToken()

     user.refreshToken=refreshToken
     await user.save({validateBeforesave: false})
    
     return {accessToken,refreshToken}

  } catch (error) {
      throw new ApiError(500, "something went wrong when generate refresh and access token")
  }
}

const loginUser = asyncHandler(async(req,re) => {
   // req body-> data
   // username or email
   //find the user
   //password check
   //access and refresh token
   // send cookie

   const {email , username, password} = req.body

   if(!(username || email)){
    throw new ApiError(400,"username and email is required")
   }

    const user =await User.findOne({
      $or:[{username}, {email}]
    })

    if(!user){
      throw new ApiError(404, "User does not exist")
    }
    const isPaswswordValid = await user.isPasswordCorrect(password)

    if(!isPaswswordValid){
      throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

   const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   // cookies

   const options = {
    httpOnly:true,
    secure: true
   }
   return res.status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,accessToken,refreshToken
      },
      "user logged in Successfully"
    )
   )

})

 const logoutUser = asyncHandler(async(req,res)=>{
  
 })


export {registerUser,loginUser}