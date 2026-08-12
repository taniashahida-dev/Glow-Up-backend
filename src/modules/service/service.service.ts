import prisma from "../../lib/prisma";

interface CreateServiceInput {
  name: string;
  description?: string;
  price: number;
  duration: number;
  categoryId: string;
}

interface UpdateServiceInput {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  categoryId?: string;
  status?: "ACTIVE" | "INACTIVE";
}

const createService = async (payload: CreateServiceInput) => {
  const category = await prisma.category.findFirst({
    where: {
      id: payload.categoryId,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const service = await prisma.service.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      duration: payload.duration,
      categoryId: payload.categoryId,
    },
    include: {
      category: true,
    },
  });

  return service;
};

const getAllServices = async () => {
  return prisma.service.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getServiceById = async (id: string) => {
  const service = await prisma.service.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

const updateService = async (
  id: string,
  payload: UpdateServiceInput
) => {
  const existingService = await prisma.service.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingService) {
    throw new Error("Service not found");
  }

  if (payload.categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: payload.categoryId,
        isDeleted: false,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  const service = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return service;
};

const deleteService = async (id: string) => {
  const existingService = await prisma.service.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingService) {
    throw new Error("Service not found");
  }

  const service = await prisma.service.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return service;
};

export const serviceService = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};