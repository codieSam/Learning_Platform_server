import nodemailer from "nodemailer"
import { envConfig } from "../config/config"


//incoming data ko type object vayeko ley teslai esari type dinuparxa 

interface IMailInformation {
    to: string,
    subject : string,
    text: string
}
//yo funtion lai anta call garda await use garnu parxa
const sendMail = async(mailInformation: IMailInformation)=>{
    // mail pathauney logic goes here
    // step 1: Create nodemailer transport/configuration
    // kasto khalko mail pathauney ho teo chai service ho
    // hamro business gmail address chai user ho
    // App pass ho
   const transporter = nodemailer.createTransport({
        service:"gmail",  //yahoo, hotmail
        auth: {
            user: envConfig.mailUser,
            pass: envConfig.mailPass // yo real password haina -- yo app password ho jun chai manage your gmail acount ma gyrew app password ma gayerw banainxa
 } })  



 const mailFormatObject = {
    from : "learning-platform <samratbbelbase408@gmail.com>",
    to: mailInformation.to,
    subject : mailInformation.subject,
    text: mailInformation.text,
 }
 try{
 await transporter.sendMail(mailFormatObject)
 }catch(e){
    console.log(e)
 }

}

export default sendMail