import express from "express";
import {
  getAllUsers,
  getMyDetails,
  register,
  login,
  logout
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router.route("/userId/:id").get(getUserwithId).put(updateUserwithId).delete(deleteUserwithId);
router.get("/me", isAuthenticated, getMyDetails);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/all", getAllUsers);

export default router;
