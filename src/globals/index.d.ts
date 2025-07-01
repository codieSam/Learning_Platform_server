import { Request } from "express";

export interface IExtendedRequest extends Request{
user ?: {
    
}
}

// import { Request } from 'express';

// // Extend Express' Request interface to include 'user' property
// declare global { 
//   namespace Express {
//     interface Request {
//       user: {
//         name: string;
//         age: number;
//       };
//     }
//   }
// }