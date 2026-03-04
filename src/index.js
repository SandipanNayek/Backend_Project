import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})
 import express from "express";
 const app=express();
connectDB()
.then(() => {

     app.on("error", (error) => {
        console.log("error",console.error
        )
        throw error
        
       })

    app.listen(process.env.PORT || 8000,() => {
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection fail" ,err)
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

