import { Request  } from "express"
export interface IExtendedRequest extends Request{
     user?: {             // we can also pass object here
        email: string,
        role: string,
        userName: string | null
    },
    // headers:{
    //     authorization: string
    // } & Request['headers']
   
}