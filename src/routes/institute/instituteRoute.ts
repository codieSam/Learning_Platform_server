import express, {Router} from "express"
import { createCourse, createInstitute, createStudent, createTeacher } from "../../controller/institute/instituteController"
import isLoggedIn from "../../middleware/middleware"


const router: Router = express.Router()

router.route("/").post(isLoggedIn,createInstitute, createTeacher, createStudent, createCourse)

export default router