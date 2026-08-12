"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createReview = async (userId, payload) => {
    if (payload.rating < 1 || payload.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    const service = await prisma_1.default.service.findFirst({
        where: {
            id: payload.serviceId,
            isDeleted: false,
            status: "ACTIVE",
        },
    });
    if (!service) {
        throw new Error("Service not found or inactive");
    }
    const review = await prisma_1.default.review.create({
        data: {
            userId,
            serviceId: payload.serviceId,
            rating: payload.rating,
            comment: payload.comment,
        },
        include: {
            service: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    return review;
};
const getAllReviews = async () => {
    return prisma_1.default.review.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            service: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getReviewById = async (id) => {
    const review = await prisma_1.default.review.findFirst({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            service: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (!review) {
        throw new Error("Review not found");
    }
    return review;
};
const updateReview = async (id, payload) => {
    const existingReview = await prisma_1.default.review.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!existingReview) {
        throw new Error("Review not found");
    }
    if (payload.rating !== undefined &&
        (payload.rating < 1 || payload.rating > 5)) {
        throw new Error("Rating must be between 1 and 5");
    }
    const review = await prisma_1.default.review.update({
        where: {
            id,
        },
        data: {
            rating: payload.rating,
            comment: payload.comment,
        },
        include: {
            service: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    return review;
};
const deleteReview = async (id) => {
    const existingReview = await prisma_1.default.review.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!existingReview) {
        throw new Error("Review not found");
    }
    return prisma_1.default.review.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
};
exports.reviewService = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
