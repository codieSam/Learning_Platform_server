import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { envConfig } from "../config/config"
import User from "../database/models/user.model"


//IExtendedRequest ko thau ma j lekhe pani hunxa 
// Typescript ma Request ko type tanna lai(manually assign gareko value haru ko lagi) 
// typecsript ma esto garinxa aru kei pani haina testo complex kei pani xaina

interface IExtendedRequest extends  Request{
    user?: {             // we can also pass object here
        email: string,
        role: string,
        userName: string | null
    }
}

// interface IResult {
//     id: string,
//     iat: number,
//     exp: number
// }


   const isLoggedIn = async (req: IExtendedRequest, res: Response, next: NextFunction)=>{
    // check if login or not

    // --> token accept garney 

    console.log("login trigerred")
    

   
    const token = req.headers.authorization
    if(!token){
        res.status(401).json({
            message: "Please provide token to continue"
        })
       return
    }
    //if jwt token ayo vaney
    // --> token verify garney

    // console.log("The token is ", token)

    jwt.verify(token, envConfig.jwtSecret || "defaultSecretKey",async (error, result:any)=>{
        if(error){
            res.status(403).json({
                message: "Token is invalid"
            })
        }else{
            //verify vayo
            // console.log(result, "Result ayo")
        //   const userData = await User.findAll({   --> This is wll give an array
        //         where: {
        //             id: result.id
        //         }
            // })
            // if(userData.length === 0){
            //     res.status(404).json({
            //         message: "NO user with that id, Invalid token"
            //     })
            // }else{
            //     console.log("Successfully verified")
            // }


            const userData = await User.findByPk(result.id)   //This will give an Object
                if(!userData){
                res.status(403).json({
                    message: "NO user with that id, Invalid token"
                })
                
            } else{
                console.log("Userdata: ",userData)
                req.user = {
                    email: userData.email,
                    role: userData.role,
                    userName: userData.username
                }
                next()
            }
              
                
                }

           
        }
    )

    //always remember to add next nai vaney ehi rokinxa process

    }
    // static restrictTo (req: Request, res: Response){

    // } //example middleware  --> we can create as many as we want


// class Middleware {
//    static isLoggedIn(req: IExtendedRequest, res: Response, next: NextFunction){
//     // check if login or not

//     // --> token accept garney 

//     console.log("s login trigerred")
    
//     const name = "Samey"
   
//     const token = req.headers.authorization
//     if(!token){
//         res.status(404).json({
//             message: "Please provide token to continue"
//         })
//         return
//     }
//     //if jwt token ayo vaney
//     // --> token verify garney

//     console.log("The token is ", token)

//     jwt.verify(token, envConfig.jwtSecret || "defaultSecretKey",async (error, result:any)=>{
//         if(error){
//             res.status(403).json({
//                 message: "Token is invalid"
//             })
//         }else{
//             //verify vayo
//             // console.log(result, "Result ayo")
//         //   const userData = await User.findAll({   --> This is wll give an array
//         //         where: {
//         //             id: result.id
//         //         }
//             // })
//             // if(userData.length === 0){
//             //     res.status(404).json({
//             //         message: "NO user with that id, Invalid token"
//             //     })
//             // }else{
//             //     console.log("Successfully verified")
//             // }

//             const userData = await User.findByPk(result.id)   //This will give an Object
//                 if(!userData){
//                 res.status(404).json({
//                     message: "NO user with that id, Invalid token"
//                 })
//                  }else{
//                 console.log("Successfully verified")
//                req.user.name = name,
//                req.user.age =  23
//                 }
//                 }

           
//         }
//     )

//     next()      //always remember to add next nai vaney ehi rokinxa process

//     }
//     // static restrictTo (req: Request, res: Response){

//     // } //example middleware  --> we can create as many as we want
// }


export default isLoggedIn