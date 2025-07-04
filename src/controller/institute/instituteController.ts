import { NextFunction, Request, Response } from 'express';
import sequelize from '../../database/connection';
import generateRandomInstituteNumber from '../../services/instituteRandomNo';
import { IExtendedRequest } from '../../middleware/type';
import User from '../../database/models/user.model';


   const  createInstitute = async(req:IExtendedRequest, res:Response, next: NextFunction)=>{
        
 
      if(req.body === undefined){
            res.status(500).json({
                message: "The body is undefned"
            })
            return 
        }
        console.log(req.user, "Data from middleware")
        const {instituteName, instituteEmail, institutePhoneNumber, instituteAddress} = req.body;
        const {institutePanNo} = req.body || null;
        const {instituteVatNo} = req.body || null;
        console.log(instituteVatNo)
        if(!instituteName || !instituteAddress || !instituteEmail || !institutePhoneNumber){
            res.status(400).json({
                message: "PLease provide institute name, address, email and phone number"
            })
            return;
        }

        // aayo vaney: institute create garnu paryo -- intitute_table, course_table
       
    
const instituteNumber = generateRandomInstituteNumber()

        await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            instituteName VARCHAR(255) NOT NULL,
            instituteEmail VARCHAR(255) NOT NULL UNIQUE,
            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
            instituteAddress VARCHAR(255) NOT NULL,
            institutePanNo VARCHAR(255),
            instituteVatNo VARCHAR(255),

            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

          

        //insert values

            await sequelize.query(`INSERT INTO institute_${instituteNumber}(
                instituteName,
                instituteEmail ,
                institutePhoneNumber ,
                instituteAddress ,
                institutePanNo,
                instituteVatNo
                ) VALUES (?,?,?,?,?,?)`, 
            {
                replacements: [instituteName, instituteEmail, institutePhoneNumber, instituteAddress,institutePanNo || null,instituteVatNo || null]
            }
            )
     


// Here i am going to create a history table for the users instutions

        await sequelize.query (`CREATE TABLE IF NOT EXISTS user_institutes(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            userId VARCHAR(255) REFERENCES users(id),
            instituteNumber int UNIQUE
            )`)
            await sequelize.query(`INSERT INTO user_institutes(userId, instituteNumber)VALUES(?,?)`,{
                replacements: [req.user?.id, instituteNumber]
            })

        // institutenumber lai user table ma lagerw rakhnu cha

        // const user = User.findByPk(req.user && req.user.id)
        // user?.currentInstituteNumber = instituteNumber
        // await user?.save()

    if(req.user){
    User.update({       // another way
            currentInstituteNumber : instituteNumber,
            role: "institute"
        },{
            where: {
                id: req.user?.id
            }
        })

        // res.status(200).json({
        //     message:"User updated successfully"
        // })

    // await sequelize.query(`UPDATE User SET currentInstituteNumber == ${instituteNumber} WHERE id == ${req.user.id} `)
    }
        
    req.instituteNumber = instituteNumber
    next()

   }
 
  
    



    const  createTeacher =async(req:IExtendedRequest, res:Response, next:NextFunction)=>{
       
           const instituteNumber = req.instituteNumber
await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
            id INT PRIMARY KEY AUTO_INCREMENT,
            teacherName VARCHAR(255) NOT NULL,
            teacherEmail VARCHAR(255) NOT NULL,
            teacherPhoneNumber VARCHAR(255) NOT NULL
            ) `)
       

next()
        
    }

    const createStudent = async (req:IExtendedRequest, res:Response, next:NextFunction)=>{
     
            const instituteNumber = req.instituteNumber
            await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
                id INT PRIMARY KEY AUTO_INCREMENT,
                studentName VARCHAR(255) NOT NULL,
                studentEmail VARCHAR(255) NOT NULL,
                studentPhoneNumber VARCHAR(255) NOT NULL
                )`)
        
        next()
    }

    const createCourse = async (req:IExtendedRequest, res:Response)=>{
        
            const instituteNumber = req.instituteNumber
            console.log("INst NUmber is :",instituteNumber)
            await sequelize.query(`CREATE TABLE course_${instituteNumber}(
                id INT PRIMARY KEY AUTO_INCREMENT,
                courseName VARCHAR(255) NOT NULL,
                coursePrice VARCHAR(255) NOT NULL
                )`)
                res.status(200).json({
                    message: "Finally institute create vayo hai !!!",
                    Institute_id: instituteNumber
                })
       
    }
    


        export {createInstitute, createTeacher, createStudent,createCourse}