const express = require("express");
const router = express.Router();
const { addProduct, getProducts, deleteProduct,updateProduct } = require("../controllers/productController");

router.post("/", addProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
