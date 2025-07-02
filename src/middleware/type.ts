import { Request  } from "express"
export interface IExtendedRequest extends Request{
     user?: { 
        id:string,            // we can also pass object here
        email: string,
        role: string,
        userName: string | null
    },
    // headers:{
    //     authorization: string
    // } & Request['headers']

    instituteNumber?:number | string
}