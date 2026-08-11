import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await categoryService.createCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create category",
      data: null,
    });
  }
};

const getAllCategories = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await categoryService.getAllCategories();

    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
      data: null,
    });
  }
};

const getCategoryById = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await categoryService.getCategoryById(
      req.params.id  as string
    );

    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Category not found",
      data: null,
    });
  }
};

const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await categoryService.updateCategory(
      req.params.id  as string,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update category",
      data: null,
    });
  }
};

const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await categoryService.deleteCategory(
      req.params.id  as string
    );

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete category",
      data: null,
    });
  }
};

export const categoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};