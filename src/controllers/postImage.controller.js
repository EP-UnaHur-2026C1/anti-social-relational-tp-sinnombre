const { PostImage } = require("../models");

const create = async (req, res) => {
    try {
        const image = await PostImage.create(req.body);
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const image = await PostImage.findByPk(req.params.id);

        if (!image) {
            return res.status(404).json({
                message: "Imagen no encontrada"
            });
        }

        await image.destroy();

        res.json({
            message: "Imagen eliminada"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    create,
    remove
};