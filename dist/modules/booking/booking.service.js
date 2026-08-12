"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createBooking = async (userId, payload) => {
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
    const booking = await prisma_1.default.booking.create({
        data: {
            userId,
            serviceId: payload.serviceId,
            date: new Date(payload.date),
            notes: payload.notes,
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
    return booking;
};
const getAllBookings = async () => {
    return prisma_1.default.booking.findMany({
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
const getBookingById = async (id) => {
    const booking = await prisma_1.default.booking.findFirst({
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
    if (!booking) {
        throw new Error("Booking not found");
    }
    return booking;
};
const updateBooking = async (id, payload) => {
    const existingBooking = await prisma_1.default.booking.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!existingBooking) {
        throw new Error("Booking not found");
    }
    const data = {};
    if (payload.date) {
        data.date = new Date(payload.date);
    }
    if (payload.notes !== undefined) {
        data.notes = payload.notes;
    }
    if (payload.status) {
        data.status = payload.status;
    }
    const booking = await prisma_1.default.booking.update({
        where: {
            id,
        },
        data,
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
    return booking;
};
const deleteBooking = async (id) => {
    const existingBooking = await prisma_1.default.booking.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!existingBooking) {
        throw new Error("Booking not found");
    }
    const booking = await prisma_1.default.booking.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return booking;
};
exports.bookingService = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};
