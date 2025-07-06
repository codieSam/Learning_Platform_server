import express, {Router} from "express"
import { createCategory, createCourse, createInstitute, createStudent, createTeacher } from "../../controller/institute/instituteController"
import isLoggedIn from "../../middleware/middleware"
import asyncErrorHndler from "../../services/asyncErrorHandler"



const router: Router = express.Router()

router.route("/").post(asyncErrorHndler(isLoggedIn),asyncErrorHndler(createInstitute), asyncErrorHndler(createTeacher), asyncErrorHndler(createStudent),asyncErrorHndler(createCategory), asyncErrorHndler(createCourse))

export default router