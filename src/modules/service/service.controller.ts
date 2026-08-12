import { Request, Response } from "express";
import { serviceService } from "./service.service";

const createService = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await serviceService.createService(req.body);

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create service",
      data: null,
    });
  }
};

const getAllServices = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await serviceService.getAllServices();

    return res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve services",
      data: null,
    });
  }
};

const getServiceById = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await serviceService.getServiceById(
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "Service retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Service not found",
      data: null,
    });
  }
};

const updateService = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await serviceService.updateService(
      req.params.id as string,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update service",
      data: null,
    });
  }
};

const deleteService = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await serviceService.deleteService(
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete service",
      data: null,
    });
  }
};

export const serviceController = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};