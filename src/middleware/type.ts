import { Request  } from "express"
export interface IExtendedRequest extends Request{
     user?: { 
        id:string,            // we can also pass object here
        email: string,
        role: string,
        userName: string | null,
        currentInstituteNumber: string | number | null

    },
    // headers:{
    //     authorization: string
    // } & Request['headers']

    
}