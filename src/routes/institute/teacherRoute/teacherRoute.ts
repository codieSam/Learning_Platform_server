import  express ,{ Router } from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHndler from "../../../services/asyncErrorHandler";
import { createTeacher, deleteTeacher, getTeachers} from "../../../controller/institute/teacher/teacherController";
import upload from "../../../services/multerUpload";

const router:Router = express.Router()

router.route('/')
.post(isLoggedIn, upload.single('teacherPhoto'),asyncErrorHndler(createTeacher))
.get(isLoggedIn, asyncErrorHndler(getTeachers))
router.route('/:id').delete(isLoggedIn, asyncErrorHndler(deleteTeacher))


export default router