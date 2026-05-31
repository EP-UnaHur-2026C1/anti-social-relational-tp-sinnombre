const { Op } = require("sequelize");

const { Post, User, PostImage, Comment, Tag } = require("../models");

const create = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAll = async (req, res) => {
    try {

        const months = process.env.COMMENT_VISIBLE_MONTHS || 6;

        const limitDate = new Date();

        limitDate.setMonth(limitDate.getMonth() - months);

        const posts = await Post.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Comment,
                    where: {
                        createdAt: {
                            [Op.gte]: limitDate
                        }
                    },
                    required: false
                },
                {
                    model: PostImage
                },
                {
                    model: Tag
                }
            ]
        });

        res.json(posts);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getById = async (req, res) => {
    try {

        const months = process.env.COMMENT_VISIBLE_MONTHS || 6;

        const limitDate = new Date();

        limitDate.setMonth(limitDate.getMonth() - months);

        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User
                },
                {
                    model: Comment,
                    where: {
                        createdAt: {
                            [Op.gte]: limitDate
                        }
                    },
                    required: false
                },
                {
                    model: PostImage
                },
                {
                    model: Tag
                }
            ]
        });

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        res.json(post);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        await post.update(req.body);
        res.json(post);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        await post.destroy();

        res.json({
            message: "Post eliminado"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};