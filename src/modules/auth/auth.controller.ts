import { Request, Response } from "express";
import { authService } from "./auth.service";
import prisma from "../../lib/prisma";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
      data: null,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Invalid credentials",
      data: null,
    });
  }
};

const getMe = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    const user = await prisma.user.findUnique({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
      data: null,
    });
  }
};
export const authController = {
  register,
  login,getMe,
};

