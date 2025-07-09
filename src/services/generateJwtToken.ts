import jwt from "jsonwebtoken"
import { envConfig } from "../config/config"
const generateJwtToken = (data : {
    id:string,
    instituteNumber ?: string
})=>{
    //@ts-ignore
    const token = jwt.sign({id: dataToEncrypt},envConfig.jwtSecret,{
        expiresIn: "30d"
    }, {
        
    })


}

export default generateJwtToken