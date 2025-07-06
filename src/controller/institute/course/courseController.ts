import { Request,Response } from "express"
import sequelize from "../../../database/connection"
import { IExtendedRequest } from "../../../middleware/type"

const createCourse =async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const {coursePrice, courseName, courseDescription, courseDuration ,courseLevel} = req.body
  
    if(!courseName || !courseDescription || !courseDuration || !coursePrice || !courseLevel ){
        res.status(400).json({
            message: "Please provide all course details"
        })
    }
    // console.log(req.file, "File")
    // const courseThumbnail = req.file ? req.file.filename : "null"  --> for local storage
    const courseThumbnail = req.file ? req.file.path : null    // for cloud storage
    console.log(courseThumbnail, "The course thumbnail address")
  const returnedData =  await sequelize.query(`INSERT INTO course_${instituteNumber} (coursePrice, courseName, courseDescription,courseThumbnail, courseDuration ,courseLevel)
        VALUES(?,?,?,?,?,?)`,{
            replacements: [coursePrice,courseName, courseDescription, courseThumbnail, courseDuration,courseLevel]
        })
        console.log(returnedData),
        res.status(200).json({
            message: "Course created successfully",
            course_id: instituteNumber
        })
}

const deleteCourse = async(req:IExtendedRequest, res: Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const courseId = req.params.id

    // ast first check that if the course is exists or not
    //given query gives an array
   const [courseData] =  await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ?`,{
        replacements: [courseId]
    })

    if(courseData.length == 0){
        return res.status(404).json({
            message: "No curse with given id"
        })
    }

await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`, {
    replacements: [courseId]
})
res.status(200).json({
    message: "Course deleted successfully !"
})
}


const getAllCourse = async (req: IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
   const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
    res.status(200).json({
        message: "Course fetched !",
        data: courses || []
    })
}
const getSingleCourse = async (req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
   const courseId = req.params.id
   const course =  await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE curseId = ?`,{
        replacements: [courseId]
    })
    res.status(200).json({
        message: "Sngle with given id is fetched",
        data: course
    })
}


export {createCourse, deleteCourse, getAllCourse, getSingleCourse}