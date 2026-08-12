"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const register = async (req, res) => {
    try {
        const result = await auth_service_1.authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
            data: null,
        });
    }
};
const login = async (req, res) => {
    try {
        const result = await auth_service_1.authService.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Invalid credentials",
            data: null,
        });
    }
};
const getMe = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                data: null,
            });
        }
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                isDeleted: true,
            },
        });
        if (!user || user.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve user",
            data: null,
        });
    }
};
exports.authController = {
    register,
    login, getMe,
};
