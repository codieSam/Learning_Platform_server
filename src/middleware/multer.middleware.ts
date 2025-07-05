// multer ko lagi confiuration gardai !
import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    // file lai kahan rakhney ta !
    //cb -> call back 
    //cb(error, success)
    // yo locally storage garney tarika ho
    destination: function(req:Request, file:Express.Multer.File, cb:any){

        cb(null, './src/storage')
        
    },
    // k name diyera rakhney tw !
    filename: function(req:Request, file:Express.Multer.File, cb:any){
        cb(null, file.originalname +'_'+ Date.now())
    }
})


// hello.png -> multer -> location(src/storage) -> hello_2082-03-22.png(Rename with unique name too avoid same name)


export {multer, storage}