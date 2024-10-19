import express from "express";
import {
  login,
  refresh,
  logout,
} from "../controllers/auth.controller.js";
import { isUser } from "../middlewares/authJwt.js";
import {
  forgetPassword,
  resetPassword,
} from "../controllers/forgetPassword.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", [isUser], logout);

router.post("/forgetPassword", forgetPassword);
router.put("/reset-password/:token", resetPassword);

export default router;
