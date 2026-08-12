import { Router } from "express";
import { authController } from "../modules/auth/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateRequiredFields } from "../middleware/validation.middleware";

const router = Router();

router.post(
  "/register",
  validateRequiredFields([
    "name",
    "email",
    "password",
  ]),
  authController.register
);

router.post(
  "/login",
  validateRequiredFields([
    "email",
    "password",
  ]),
  authController.login
);

router.get(
  "/me",
  authMiddleware,
  authController.getMe
);

export default router;