import { Router } from "express";
import { bookingController } from "../modules/booking/booking.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateRequiredFields } from "../middleware/validation.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validateRequiredFields([
    "serviceId",
    "date",
  ]),
  bookingController.createBooking
);

router.get(
  "/",
  authMiddleware,
  bookingController.getAllBookings
);

router.get(
  "/:id",
  authMiddleware,
  bookingController.getBookingById
);

router.patch(
  "/:id",
  authMiddleware,
  bookingController.updateBooking
);

router.delete(
  "/:id",
  authMiddleware,
  bookingController.deleteBooking
);

export default router;