const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");
const { checkToken, checkAdmin } = require("../middleware/authMiddleware");
const upload = require("../config/multer"); // ✅ Só essa linha

router.get("/", produtoController.getAll);
router.post("/", checkToken, checkAdmin, upload.single("imagem"), produtoController.create);
router.put("/:id", checkToken, checkAdmin, upload.single("imagem"), produtoController.update);
router.delete("/:id", checkToken, checkAdmin, produtoController.remove);

module.exports = router;