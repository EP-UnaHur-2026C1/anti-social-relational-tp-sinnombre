const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment.controller");
const validate = require("../middlewares/validation.middleware");
const commentSchema = require("../middlewares/validations/comment.schema");

router.post("/", validate(commentSchema), commentController.create);
router.get("/", commentController.getAll);
router.get("/:id", commentController.getById);
router.put("/:id", validate(commentSchema), commentController.update);
router.delete("/:id", commentController.remove);

module.exports = router;