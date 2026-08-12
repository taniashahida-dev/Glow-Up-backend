"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createCategory = async (payload) => {
    const existingCategory = await prisma_1.default.category.findUnique({
        where: {
            name: payload.name,
        },
    });
    if (existingCategory && !existingCategory.isDeleted) {
        throw new Error("Category already exists");
    }
    const category = await prisma_1.default.category.create({
        data: {
            name: payload.name,
            description: payload.description,
        },
    });
    return category;
};
const getAllCategories = async () => {
    return prisma_1.default.category.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getCategoryById = async (id) => {
    const category = await prisma_1.default.category.findFirst({
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
const updateCategory = async (id, payload) => {
    const existingCategory = await prisma_1.default.category.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!existingCategory) {
        throw new Error("Category not found");
    }
    const category = await prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return category;
};
const deleteCategory = async (id) => {
    const existingCategory = await prisma_1.default.category.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!existingCategory) {
        throw new Error("Category not found");
    }
    const category = await prisma_1.default.category.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return category;
};
exports.categoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
