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
router.get("/category", productController.getAllCategories);
router.post(
  "/",
  verifyToken,
  checkRole(["shop"]),
  productController.createProduct
);
router.get(
  "/all",
  verifyToken,
  checkRole(["admin"]),
  productController.getAllProducts
);
router.get(
  "/my-products",
  verifyToken,
  checkRole(["shop"]),
  productController.getMyProducts
);
router.get("/", productController.getAllActiveProducts);
router.patch(
  "/approve/:productId",
  verifyToken,
  checkRole(["admin"]),
  productController.approveProduct
);

module.exports = router;
