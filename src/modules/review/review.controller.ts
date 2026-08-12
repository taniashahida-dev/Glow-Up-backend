import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { reviewService } from "./review.service";

const createReview = async (
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

    const result = await reviewService.createReview(
      userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create review",
      data: null,
    });
  }
};

const getAllReviews = async (
  _req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await reviewService.getAllReviews();

    return res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: result,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve reviews",
      data: null,
    });
  }
};

const getReviewById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await reviewService.getReviewById(
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Review not found",
      data: null,
    });
  }
};

const updateReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await reviewService.updateReview(
      req.params.id as string,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update review",
      data: null,
    });
  }
};

const deleteReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await reviewService.deleteReview(
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete review",
      data: null,
    });
  }
};

export const reviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};