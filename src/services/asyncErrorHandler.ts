// Error handling code
//CallBAck FUnction -> Jun function as a parameter arko function ma janxa Eg: (fn)


import   { Request, Response, NextFunction } from "express"

 // Higher oerder function --> that accepts another fuction as  paramater 
    //Higer order function : eg- filter, map, reduce, foreach
    //eg: arrays.forEach(function(){})
    //here, array is higher order function
    //function(){} is call back function

const asyncErrorHndler =(fn:Function)=>{ 
    return (req:Request,res:Response ,next:NextFunction)=>{
        fn(req,res,next).catch((e:Error)=>{
            console.log(e)
            return res.status(500).json({
                message: e.message,
                fullError: e
            })
        })
    }
}

export default asyncErrorHndler