import { NextFunction, Response } from 'express';
import sequelize from '../../database/connection';
import generateRandomInstituteNumber from '../../services/instituteRandomNo';
import { IExtendedRequest } from '../../middleware/type';
import User from '../../database/models/user.model';
import categories from '../../../seed';


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
            id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
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
           id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
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
       
    if(req.user){
        req.user.currentInstituteNumber = instituteNumber
    }

   
   
    next()

   }
 
  
    



    const  createTeacher =async(req:IExtendedRequest, res:Response, next:NextFunction)=>{
       
           const instituteNumber = req.user?.currentInstituteNumber
           console.log("The institute number is : ", instituteNumber)
await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
           id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
            teacherName VARCHAR(255) NOT NULL,
            teacherEmail UNIQUE VARCHAR(255) NOT NULL,
            teacherPhoneNumber UNIQUE VARCHAR(255) NOT NULL,
            teacherExpertise VARCHAR(100),
            teacherPassword VARCHAR(255),
            joinDate DATE,
            teacherPhoto VARCHAR(255),
            salary VARCHAR(100),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) `)
       

next()
        
    }

    const createStudent = async (req:IExtendedRequest, res:Response, next:NextFunction)=>{
     
            const instituteNumber = req.user?.currentInstituteNumber
            await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
                id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                studentName VARCHAR(255) NOT NULL,
                studentEmail VARCHAR(255) NOT NULL,
                studentPhoneNumber VARCHAR(255) NOT NULL,
                studentAddress TEXT NOT NULL,
                enrolledDate DATE NOT NULL,
                studentImage VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )`)
        
        next()
    }

    const createCourse = async (req:IExtendedRequest, res:Response)=>{
        
            const instituteNumber = req.user?.currentInstituteNumber
            console.log("INst NUmber is :",instituteNumber)
            await sequelize.query(`CREATE TABLE course_${instituteNumber}(
               id VARCHAR(36) PRIMARY KEY DEFAULT UUID(),
                courseName VARCHAR(255) NOT NULL UNIQUE,
                coursePrice VARCHAR(255) NOT NULL,
                courseDescription TEXT NOT NULL,
                courseDuration VARCHAR(100) NOT NULL,
                courseThumbnail VARCHAR(255) NOT NULL,
                courseLevel ENUM('beginner', 'intermediate', 'advance') NOT NULL,
                teacherId VARCHAR(36) REFERENCES teacher_${instituteNumber}(id),
                categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber}(id),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )`)
                res.status(200).json({
                    message: "Institute created successfully",
                    Institute_id: instituteNumber
                })
       
    }
    

    const createCategory = async(req:IExtendedRequest, res:Response, next:NextFunction)=>{
        const instituteNumber = req.user?.currentInstituteNumber
        await sequelize.query(`CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
            id VARCHAR(36) PRIMARY KEY DEFAULT UUID(),
            categoryName VARCHAR(100) UNIQUE NOT NULL,
            categoryDescription TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`)

            categories.forEach(async function(category){
            await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName, categoryDescription) VALUES (?,?)`,{
                replacements: [category.categoryName, category.categoryDescription ]
            })  // Data seeding
            })

            
            next()
    }



        export {createInstitute, createTeacher, createStudent,createCourse, createCategory}