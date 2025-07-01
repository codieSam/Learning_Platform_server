import { Request, Response } from 'express';
import sequelize from '../../database/connection';
import generateRandomInstituteNumber from '../../services/instituteRandomNo';
class InstituteCntroller{
    static async createInstitute(req:Request, res:Response){
        if(req.body === undefined){
            res.status(500).json({
                message: "The body is undefned"
            })
            return 
        }

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
        res.status(200).json({
        message: "Institute created!"
        })

    }
     
}

export default InstituteCntroller