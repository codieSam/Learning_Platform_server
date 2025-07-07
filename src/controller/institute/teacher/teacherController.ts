import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword";
import sendMail from "../../../services/sendMail";

const createTeacher =async (req:IExtendedRequest, res:Response)=>{
    
    const {teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinDate, salary, teacherPassword, courseId} = req.body
    const teacherPhoto = req.file ? req.file.path : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fuser&psig=AOvVaw3vH8ACBqnkjiRCzxjUfoEe&ust=1751950056589000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCMtOv4qY4DFQAAAAAdAAAAABAE"
    if(!teacherName || !teacherEmail ||!teacherPhoneNumber ||!teacherExpertise|| !salary || !joinDate || !teacherPhoto ){
        res.status(400).json({
            message: "Please provide all details "
        })
        return
    }
    const pwData = generateRandomPassword(teacherName)
    const instituteNumber = req.user?.currentInstituteNumber
   await sequelize.query(`INSERT INTO teacher_${instituteNumber}(teacherName, teacherPhoneNumber, teacherEmail,teacherExpertise, joinDate, salary, teacherPhoto, teacherPassword) VALUES (?,?,?,?,?,?,?,?) `,{
        type: QueryTypes.INSERT,
        replacements: [teacherName,teacherPhoneNumber,teacherEmail,teacherExpertise,joinDate,salary, teacherPhoto, pwData.hashedVersion]
    })
   

    const teacherData : {id:string}[]= await sequelize.query(`SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail = ?`,{
        type: QueryTypes.SELECT,
        replacements: [teacherEmail]
    })
    console.log("Inserted data of teacher", teacherData)



    await sequelize.query(`UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,{
        type:QueryTypes.UPDATE,
        replacements: [teacherData[0].id, courseId]
    })

    //send mail function 
    const mailInformation = {
        to: teacherEmail,
        subject : "This is subject",
        text :`Me/Ms: ${teacherName}, This is the reason why i mailed you , this is your password for this platform ${pwData.plainVersion}`
    }
    
    await sendMail(mailInformation);


     res.status(200).json({
        message: "Teacher added successfully"
    })

}






const getTeachers = async(req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
   const teachers =  await sequelize.query(`SELECT * FROM teacher_${instituteNumber}`,{
        type:QueryTypes.SELECT
    })
    res.status(200).json({
        message: "Teacers fetched successfully",
        data: teachers
    })

}


const deleteTeacher = async (req:IExtendedRequest, res:Response)=>{
    const id = req.params.id
    const instituteNumber = req.user?.currentInstituteNumber

    await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id = ?`,{
        type:QueryTypes.DELETE,
        replacements: [id]
    })

    res.status(200).json({
        message: "Teacher deleted successfully"
    })
}


export {createTeacher, getTeachers, deleteTeacher}