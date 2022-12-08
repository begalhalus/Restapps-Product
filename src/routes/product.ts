import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { auth } from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/", auth, ProductController.product);
router.get("/:id", auth, ProductController.detail);
router.post("/", auth, ProductController.store);
router.put("/:id", auth, ProductController.edit);
router.delete("/:id", auth, ProductController.delete);

export default router;
