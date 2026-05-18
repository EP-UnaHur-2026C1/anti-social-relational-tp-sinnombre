const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes");
const commentRoutes = require("./comment.routes");
const tagRoutes = require("./tag.routes");
const imageRoutes = require("./image.routes");
const followRoutes = require("./follow.routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/tags", tagRoutes);
router.use("/images", imageRoutes);
router.use("/follows", followRoutes);

module.exports = router;