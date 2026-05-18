const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validation.middleware");
const userSchema = require("../middlewares/validations/user.schema");

router.post("/", validate(userSchema), userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", validate(userSchema), userController.update);
router.delete("/:id", userController.remove);

module.exports = router;