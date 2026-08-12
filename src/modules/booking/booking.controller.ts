import { Response } from "express";
import {
  AuthenticatedRequest,
} from "../../middleware/auth.middleware";
import { bookingService } from "./booking.service";

const createBooking = async (
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

    const result = await bookingService.createBooking(
      userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create booking",
      data: null,
    });
  }
};

const getAllBookings = async (
  _req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await bookingService.getAllBookings();

    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      data: null,
    });
  }
};

const getBookingById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await bookingService.getBookingById(
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Booking not found",
      data: null,
    });
  }
};

const updateBooking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await bookingService.updateBooking(
      req.params.id as string,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update booking",
      data: null,
    });
  }
};

const deleteBooking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await bookingService.deleteBooking(
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete booking",
      data: null,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};