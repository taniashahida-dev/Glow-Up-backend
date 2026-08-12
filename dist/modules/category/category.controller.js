"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("./category.service");
const createCategory = async (req, res) => {
    try {
        const result = await category_service_1.categoryService.createCategory(req.body);
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create category",
            data: null,
        });
    }
};
const getAllCategories = async (_req, res) => {
    try {
        const result = await category_service_1.categoryService.getAllCategories();
        return res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve categories",
            data: null,
        });
    }
};
const getCategoryById = async (req, res) => {
    try {
        const result = await category_service_1.categoryService.getCategoryById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Category not found",
            data: null,
        });
    }
};
const updateCategory = async (req, res) => {
    try {
        const result = await category_service_1.categoryService.updateCategory(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update category",
            data: null,
        });
    }
};
const deleteCategory = async (req, res) => {
    try {
        const result = await category_service_1.categoryService.deleteCategory(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete category",
            data: null,
        });
    }
};
exports.categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
