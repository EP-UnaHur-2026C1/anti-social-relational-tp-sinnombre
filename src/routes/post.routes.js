const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const validate = require("../middlewares/validation.middleware");
const postSchema = require("../middlewares/validations/post.schema");

router.post("/", validate(postSchema), postController.create);
router.get("/", postController.getAll);
router.get("/:id", postController.getById);
router.put("/:id", validate(postSchema), postController.update);
router.delete("/:id", postController.remove);

module.exports = router;