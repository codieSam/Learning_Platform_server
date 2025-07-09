import jwt from "jsonwebtoken"
import { envConfig } from "../config/config"
const generateJwtToken = (dataToEncrypt: string)=>{
    //@ts-ignore
    const token = jwt.sign({id: dataToEncrypt},envConfig.jwtSecret,{
        expiresIn: "30d"
    }, {
        
    })


}

export default generateJwtToken