const express = require("express");
const router = express.Router();
const multer = require("multer");
const produtoController = require("../controllers/produtoController");
const { checkToken, checkAdmin } = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // garante que a pasta 'uploads' exista
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
  });
  
  const upload = multer({ storage });
  
router.get("/", produtoController.getAll);

router.post("/", checkToken, checkAdmin, upload.single("imagem"), produtoController.create);
router.put("/:id", checkToken, checkAdmin, upload.single("imagem"), produtoController.update);
router.delete("/:id", checkToken, checkAdmin, produtoController.remove);

module.exports = router;
