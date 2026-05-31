const express = require("express");
const router = express.Router();

const imageController = require("../controllers/postImage.controller");
const validate = require("../middlewares/validation.middleware");
const imageSchema = require("../middlewares/validations/image.schema");

router.post("/", validate(imageSchema), imageController.create);
router.delete("/:id", imageController.remove);
router.get("/", imageController.getAll);
router.get("/:id", imageController.getById);
router.put("/:id", validate(imageSchema), imageController.update);

module.exports = router;