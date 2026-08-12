"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_1 = require("../modules/service/service.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validateRequiredFields)([
    "name",
    "price",
    "duration",
    "categoryId",
]), service_controller_1.serviceController.createService);
router.get("/", service_controller_1.serviceController.getAllServices);
router.get("/:id", service_controller_1.serviceController.getServiceById);
router.patch("/:id", auth_middleware_1.authMiddleware, service_controller_1.serviceController.updateService);
router.delete("/:id", auth_middleware_1.authMiddleware, service_controller_1.serviceController.deleteService);
exports.default = router;
