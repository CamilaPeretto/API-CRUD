const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/ProdutoController");
const { checkToken, checkAdmin } = require("../middleware/authMiddleware");

router.get("/", produtoController.getAll);

router.post("/", checkToken, checkAdmin, produtoController.create);
router.put("/:id", checkToken, checkAdmin, produtoController.update);
router.delete("/:id", checkToken, checkAdmin, produtoController.remove);

module.exports = router;
