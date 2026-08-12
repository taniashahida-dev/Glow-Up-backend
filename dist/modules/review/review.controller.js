"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("./review.service");
const createReview = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                data: null,
            });
        }
        const result = await review_service_1.reviewService.createReview(userId, req.body);
        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create review",
            data: null,
        });
    }
};
const getAllReviews = async (_req, res) => {
    try {
        const result = await review_service_1.reviewService.getAllReviews();
        return res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            data: result,
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve reviews",
            data: null,
        });
    }
};
const getReviewById = async (req, res) => {
    try {
        const result = await review_service_1.reviewService.getReviewById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Review retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Review not found",
            data: null,
        });
    }
};
const updateReview = async (req, res) => {
    try {
        const result = await review_service_1.reviewService.updateReview(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update review",
            data: null,
        });
    }
};
const deleteReview = async (req, res) => {
    try {
        const result = await review_service_1.reviewService.deleteReview(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete review",
            data: null,
        });
    }
};
exports.reviewController = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
