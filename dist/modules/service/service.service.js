"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createService = async (payload) => {
    const category = await prisma_1.default.category.findFirst({
        where: {
            id: payload.categoryId,
            isDeleted: false,
        },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    const service = await prisma_1.default.service.create({
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
    return prisma_1.default.service.findMany({
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
const getServiceById = async (id) => {
    const service = await prisma_1.default.service.findFirst({
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
const updateService = async (id, payload) => {
    const existingService = await prisma_1.default.service.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!existingService) {
        throw new Error("Service not found");
    }
    if (payload.categoryId) {
        const category = await prisma_1.default.category.findFirst({
            where: {
                id: payload.categoryId,
                isDeleted: false,
            },
        });
        if (!category) {
            throw new Error("Category not found");
        }
    }
    const service = await prisma_1.default.service.update({
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
const deleteService = async (id) => {
    const existingService = await prisma_1.default.service.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!existingService) {
        throw new Error("Service not found");
    }
    const service = await prisma_1.default.service.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return service;
};
exports.serviceService = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
