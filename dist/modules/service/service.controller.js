"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceController = void 0;
const service_service_1 = require("./service.service");
const createService = async (req, res) => {
    try {
        const result = await service_service_1.serviceService.createService(req.body);
        return res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create service",
            data: null,
        });
    }
};
const getAllServices = async (_req, res) => {
    try {
        const result = await service_service_1.serviceService.getAllServices();
        return res.status(200).json({
            success: true,
            message: "Services retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve services",
            data: null,
        });
    }
};
const getServiceById = async (req, res) => {
    try {
        const result = await service_service_1.serviceService.getServiceById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Service retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Service not found",
            data: null,
        });
    }
};
const updateService = async (req, res) => {
    try {
        const result = await service_service_1.serviceService.updateService(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update service",
            data: null,
        });
    }
};
const deleteService = async (req, res) => {
    try {
        const result = await service_service_1.serviceService.deleteService(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete service",
            data: null,
        });
    }
};
exports.serviceController = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
