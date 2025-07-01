import express, {Router} from "express"
import InstituteCntroller from "../../controller/institute/instituteController"
import isLoggedIn from "../../middleware/middleware"

const router: Router = express.Router()

router.route("/").post(isLoggedIn,InstituteCntroller.createInstitute)

export default router