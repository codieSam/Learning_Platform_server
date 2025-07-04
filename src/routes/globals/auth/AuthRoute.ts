import express, { Router } from "express";
import Authc from "../../../controller/globals/auth/auth.controller";
import asyncErrorHndler from "../../../services/asyncErrorHandler";
const router: Router = express.Router();

router.route("/register").post(asyncErrorHndler(Authc.registerUser) );
router.route("/login").post(asyncErrorHndler(Authc.loginUser) );
// router.route("/login").post(Authc.loginUser);
export default router;
