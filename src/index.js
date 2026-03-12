import "dotenv/config";

import connectDB from "./db/index.js"
import { app } from "./app.js"

connectDB()
.then(() => {

  app.on("error", (error) => {
    console.error("Server error:", error)
    throw error
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running at port : ${process.env.PORT}`)
  })

})
.catch((err) => {
  console.log("MONGODB connection fail", err)
})









// import express from "express";
// const app=express();


// (async() => {
    
//         try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error", (error) => {
//         console.log("error",console.error
//         )
//         throw error
        
//        })

//        app.listen(process.env.PORT, () => {
//   console.log(` app listening on port ${process.env.PORT}`)
// })
//     } catch (error) {
//         console.error("ERROR: ",error)
//         throw error
//     }
// })()

