const dataService = require('../services/data.service');

const getAllItems = async (req, res) => {
    try {
        const items = await dataService.getAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await dataService.getItemById(req.params.id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve item' });
    }
};

const createItem = async (req, res) => {
    try {
        const newItem = await dataService.createItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
};

const updateItem = async (req, res) => {
    try {
        const updatedItem = await dataService.updateItem(req.params.id, req.body);

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
};

const deleteItem = async (req, res) => {
    try {
        const deleted = await dataService.deleteItem(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};
