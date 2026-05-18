const { Follow } = require("../models");

const followUser = async (req, res) => {
    try {
        const follow = await Follow.create(req.body);

        res.status(201).json(follow);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const relation = await Follow.findOne({
            where: req.body
        });

        if (!relation) {
            return res.status(404).json({
                message: "Relación no encontrada"
            });
        }

        await relation.destroy();

        res.json({
            message: "Usuario dejado de seguir"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    followUser,
    unfollowUser
};