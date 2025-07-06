import express, {Router} from 'express'
import isLoggedIn from '../../../middleware/middleware'
import asyncErrorHndler from '../../../services/asyncErrorHandler'
import { getAllStudents } from '../../../controller/institute/student/studentController'

import {multer, storage} from '../../../middleware/multer.middleware'

const upload = multer({storage: storage})

const router:Router = express.Router()

router.route('/')
.get(isLoggedIn, upload.single('studentImage') ,asyncErrorHndler(getAllStudents))


export default router