import express, {Router} from 'express'
import isLoggedIn from '../../../middleware/middleware'
import asyncErrorHndler from '../../../services/asyncErrorHandler'
import { getAllStudents } from '../../../controller/institute/teacher/teacherController'



const router:Router = express.Router()

router.route('/')
.get(isLoggedIn, asyncErrorHndler(getAllStudents))


export default router