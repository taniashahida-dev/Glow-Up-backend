import { Router } from "express";
import { serviceController } from "../modules/service/service.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
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