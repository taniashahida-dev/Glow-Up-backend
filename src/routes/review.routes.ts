import { Router } from "express";
import { reviewController } from "../modules/review/review.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateRequiredFields } from "../middleware/validation.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validateRequiredFields([
    "serviceId",
    "rating",
  ]),
  reviewController.createReview
);

router.get(
  "/",
  reviewController.getAllReviews
);

router.get(
  "/:id",
  reviewController.getReviewById
);

router.patch(
  "/:id",
  authMiddleware,
  reviewController.updateReview
);

router.delete(
  "/:id",
  authMiddleware,
  reviewController.deleteReview
);

export default router;