import { Router } from "express";
import { serviceController } from "../modules/service/service.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateRequiredFields } from "../middleware/validation.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validateRequiredFields([
    "name",
    "price",
    "duration",
    "categoryId",
  ]),
  serviceController.createService
);
router.get(
  "/",
  serviceController.getAllServices
);

router.get(
  "/:id",
  serviceController.getServiceById
);

router.patch(
  "/:id",
  authMiddleware,
  serviceController.updateService
);

router.delete(
  "/:id",
  authMiddleware,
  serviceController.deleteService
);

export default router;