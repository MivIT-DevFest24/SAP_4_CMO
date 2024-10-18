import express from "express";
import authrouter from "./auth.routes.js";
import userrouter from "./user.routes.js";

const router = express.Router();

router.use("/auth", authrouter);
router.use("/user", userrouter);

export default router;
