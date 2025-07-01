import express, {Router} from "express"
import InstituteCntroller from "../../controller/institute/instituteController"

const router: Router = express.Router()

router.route("/").post(InstituteCntroller.createInstitute)

export default router