"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../modules/booking/booking.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validateRequiredFields)([
    "serviceId",
    "date",
]), booking_controller_1.bookingController.createBooking);
router.get("/", auth_middleware_1.authMiddleware, booking_controller_1.bookingController.getAllBookings);
router.get("/:id", auth_middleware_1.authMiddleware, booking_controller_1.bookingController.getBookingById);
router.patch("/:id", auth_middleware_1.authMiddleware, booking_controller_1.bookingController.updateBooking);
router.delete("/:id", auth_middleware_1.authMiddleware, booking_controller_1.bookingController.deleteBooking);
exports.default = router;
