"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../modules/auth/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
router.post("/register", (0, validation_middleware_1.validateRequiredFields)([
    "name",
    "email",
    "password",
]), auth_controller_1.authController.register);
router.post("/login", (0, validation_middleware_1.validateRequiredFields)([
    "email",
    "password",
]), auth_controller_1.authController.login);
router.get("/me", auth_middleware_1.authMiddleware, auth_controller_1.authController.getMe);
exports.default = router;
