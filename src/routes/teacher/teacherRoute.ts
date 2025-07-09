import express, {Router} from "express"
import asyncErrorHndler from "../../services/asyncErrorHandler"
import { teacherLogin } from "../../controller/teacher/teacherController"


const router:Router = express.Router()

router.route('/').post(asyncErrorHndler(teacherLogin))

export default router