import prisma from "../../lib/prisma";

interface CreateBookingInput {
  serviceId: string;
  date: string;
  notes?: string;
}

interface UpdateBookingInput {
  date?: string;
  notes?: string;
  status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

const createBooking = async (
  userId: string,
  payload: CreateBookingInput
) => {
  const service = await prisma.service.findFirst({
    where: {
      id: payload.serviceId,
      isDeleted: false,
      status: "ACTIVE",
    },
  });

  if (!service) {
    throw new Error("Service not found or inactive");
  }

  const booking = await prisma.booking.create({
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
  return prisma.booking.findMany({
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

const getBookingById = async (id: string) => {
  const booking = await prisma.booking.findFirst({
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

const updateBooking = async (
  id: string,
  payload: UpdateBookingInput
) => {
  const existingBooking = await prisma.booking.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingBooking) {
    throw new Error("Booking not found");
  }

  const data: {
    date?: Date;
    notes?: string;
    status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  } = {};

  if (payload.date) {
    data.date = new Date(payload.date);
  }

  if (payload.notes !== undefined) {
    data.notes = payload.notes;
  }

  if (payload.status) {
    data.status = payload.status;
  }

  const booking = await prisma.booking.update({
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

const deleteBooking = async (id: string) => {
  const existingBooking = await prisma.booking.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingBooking) {
    throw new Error("Booking not found");
  }

  const booking = await prisma.booking.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return booking;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};