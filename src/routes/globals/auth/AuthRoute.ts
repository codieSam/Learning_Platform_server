import express, { Router } from "express";
import Authc from "../../../controller/globals/auth/auth.controller";
const router: Router = express.Router();

router.route("/register").post(Authc.registerUser);
router.route("/login").post(Authc.loginUser);
// router.route("/login").post(Authc.loginUser);
export default router;
