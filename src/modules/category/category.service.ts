import prisma from "../../lib/prisma";

interface CreateCategoryInput {
  name: string;
  description?: string;
}

interface UpdateCategoryInput {
  name?: string;
  description?: string;
}

const createCategory = async (payload: CreateCategoryInput) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (existingCategory && !existingCategory.isDeleted) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description,
    },
  });

  return category;
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getCategoryById = async (id: string) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

const updateCategory = async (
  id: string,
  payload: UpdateCategoryInput
) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  const category = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return category;
};

const deleteCategory = async (id: string) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  const category = await prisma.category.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return category;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};