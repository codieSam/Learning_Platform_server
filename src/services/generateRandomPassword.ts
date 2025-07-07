import bcrypt from "bcrypt"
const generateRandomPassword = (teacherName:string)=>{
  const randomNumber =  Math.floor(1000  + Math.random() * 90000)
  const passwordData = {
    hashedVersion: bcrypt.hashSync(`${randomNumber}_${teacherName}`, 10), //table ma save garna ko lagi
    plainVersion : `${randomNumber}_${teacherName}` // teacher lai sendgarna ko lagi (for login use)
  }
  return passwordData

}
export default generateRandomPassword