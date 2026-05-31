const express = require("express");
const router = express.Router();

const tagController = require("../controllers/tag.controller");
const validate = require("../middlewares/validation.middleware");
const tagSchema = require("../middlewares/validations/tag.schema");

router.post("/", validate(tagSchema), tagController.create);
router.get("/", tagController.getAll);
router.get("/:id", tagController.getById);
router.put("/:id", validate(tagSchema), tagController.update);
router.delete("/:id", tagController.remove);

module.exports = router;