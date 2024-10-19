import express from "express";
import {
  getProfile,
  updateUser,
  updatePassword,
  getAllUsers,
  modifyUserRole,
  getRecentUsers,
  deleteUser,
  getStatistics,
} from "../controllers/user.controller.js";
import { createUser } from "../controllers/auth.controller.js";

import { isUser, isManager } from "../middlewares/authJwt.js";
import checkDuplicateUsernameOrEmail from "../middlewares/verifyDuplicate.js";

const router = express.Router();

router.get("/profile", [isUser], getProfile);
router.put("/profile", [isUser], updateUser);
router.put("/updatePassword", [isUser], updatePassword);

// Manager routes
// router.post("/createUser", [isManager], [checkDuplicateUsernameOrEmail], createUser);
router.post("/createUser", [checkDuplicateUsernameOrEmail], createUser);
router.get("/all", [isManager], getAllUsers);
router.get("/recent", [isManager], getRecentUsers);
router.put("/modifyUserRole", [isManager], modifyUserRole);
router.delete("/delete/:id", [isManager], deleteUser);
router.get("/statistics", [isManager], getStatistics);

export default router;
