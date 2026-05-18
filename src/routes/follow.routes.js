const express = require("express");
const router = express.Router();

const followController = require("../controllers/follow.controller");
const validate = require("../middlewares/validation.middleware");
const followSchema = require("../middlewares/validations/follow.schema");

router.post("/", validate(followSchema), followController.followUser);
router.delete("/", validate(followSchema), followController.unfollowUser);

module.exports = router;