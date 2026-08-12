"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../modules/review/review.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validateRequiredFields)([
    "serviceId",
    "rating",
]), review_controller_1.reviewController.createReview);
router.get("/", review_controller_1.reviewController.getAllReviews);
router.get("/:id", review_controller_1.reviewController.getReviewById);
router.patch("/:id", auth_middleware_1.authMiddleware, review_controller_1.reviewController.updateReview);
router.delete("/:id", auth_middleware_1.authMiddleware, review_controller_1.reviewController.deleteReview);
exports.default = router;
