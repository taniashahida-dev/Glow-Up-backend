"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                data: null,
            });
        }
        const result = await booking_service_1.bookingService.createBooking(userId, req.body);
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create booking",
            data: null,
        });
    }
};
const getAllBookings = async (_req, res) => {
    try {
        const result = await booking_service_1.bookingService.getAllBookings();
        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve bookings",
            data: null,
        });
    }
};
const getBookingById = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.getBookingById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Booking retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Booking not found",
            data: null,
        });
    }
};
const updateBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.updateBooking(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update booking",
            data: null,
        });
    }
};
const deleteBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.deleteBooking(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete booking",
            data: null,
        });
    }
};
exports.bookingController = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};
