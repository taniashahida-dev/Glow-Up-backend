import prisma from "../../lib/prisma";

interface CreateReviewInput {
  serviceId: string;
  rating: number;
  comment?: string;
}

interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}

const createReview = async (
  userId: string,
  payload: CreateReviewInput
) => {
  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

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

  const review = await prisma.review.create({
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
  return prisma.review.findMany({
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

const getReviewById = async (id: string) => {
  const review = await prisma.review.findFirst({
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

const updateReview = async (
  id: string,
  payload: UpdateReviewInput
) => {
  const existingReview = await prisma.review.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingReview) {
    throw new Error("Review not found");
  }

  if (
    payload.rating !== undefined &&
    (payload.rating < 1 || payload.rating > 5)
  ) {
    throw new Error("Rating must be between 1 and 5");
  }

  const review = await prisma.review.update({
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

const deleteReview = async (id: string) => {
  const existingReview = await prisma.review.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingReview) {
    throw new Error("Review not found");
  }

  return prisma.review.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
};

export const reviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};