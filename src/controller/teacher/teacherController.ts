//teacher login implementation

import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import jsonWebToken from "jsonwebtoken"
import generateJwtToken from "../../services/generateJwtToken";


// interface to avoid the typesript error
interface ITeacherData  {
    teacherPassword: string,
    id: string
}

const teacherLogin = async(req:Request, res: Response)=>{

    const {teacherEmail, teacherPassword, teacherInstituteNumber} = req.body


if(!teacherEmail || !teacherPassword || !teacherInstituteNumber){
    res.status(400).json({
        message: "Please provide the all details !"
    })
}

  const teacherData : ITeacherData []=  await sequelize.query(`SELECT * FROM teacher_${teacherInstituteNumber}
        WHERE teacherEmail = ?`,{
            type: QueryTypes.SELECT,
            replacements: [teacherEmail]
        })

        if(teacherData.length == 0){
            return res.status(404).json({
                message: "Invalid credentials"
            })
        }


        //check password now

  const isPasswordMatch =  bcrypt.compareSync(teacherPassword, teacherData[0].teacherPassword)
   if(!isPasswordMatch){
    res.status(400).json({
        message: "Invalid credentials"
    })
   } else{
    // token genenration

   
    const token = generateJwtToken({id: teacherData[0].id, instituteNumber: teacherInstituteNumber})
    res.status(200).json({
        message: "Teacher logged in ",
        token: token
    })
   }

}

export {teacherLogin}