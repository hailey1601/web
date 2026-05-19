const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

router.post(
  "/category",
  verifyToken,
  checkRole(["admin"]),
  productController.createCategory
);

router.post(
  "/",
  verifyToken,
  checkRole(["shop"]),
  productController.createProduct
);

router.get("/", productController.getAllActiveProducts);

module.exports = router;