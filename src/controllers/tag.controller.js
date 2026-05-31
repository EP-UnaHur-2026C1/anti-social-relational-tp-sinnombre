const { Tag } = require("../models");

const create = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
        return res.status(404).json({
            message: "Tag no encontrado"
        });
    }

    res.json(tag);
};

const update = async (req, res) => {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
        return res.status(404).json({
            message: "Tag no encontrado"
        });
    }

    await tag.update(req.body);

    res.json(tag);
};

const remove = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);

        if (!tag) {
            return res.status(404).json({
                message: "Tag no encontrado"
            });
        }

        await tag.destroy();

        res.json({
            message: "Tag eliminado"
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