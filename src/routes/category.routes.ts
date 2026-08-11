import { Router } from "express";
import { categoryController } from "../modules/category/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  categoryController.createCategory
);

router.get(
  "/",
  categoryController.getAllCategories
);

router.get(
  "/:id",
  categoryController.getCategoryById
);

router.patch(
  "/:id",
  authMiddleware,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  categoryController.deleteCategory
);

export default router;