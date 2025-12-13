const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/items.json');

const readData = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = async (data) => {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

const getAllItems = async () => {
    return await readData();
};

const getItemById = async (id) => {
    const items = await readData();
    return items.find(item => item.id === parseInt(id));
};

const createItem = async (itemData) => {
    const items = await readData();
    const newItem = {
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
        ...itemData,
        createdAt: new Date().toISOString()
    };
    items.push(newItem);
    await writeData(items);
    return newItem;
};

const updateItem = async (id, itemData) => {
    const items = await readData();
    const index = items.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
        return null;
    }

    items[index] = {
        ...items[index],
        ...itemData,
        id: parseInt(id),
        updatedAt: new Date().toISOString()
    };

    await writeData(items);
    return items[index];
};

const deleteItem = async (id) => {
    const items = await readData();
    const filteredItems = items.filter(item => item.id !== parseInt(id));

    if (items.length === filteredItems.length) {
        return false;
    }

    await writeData(filteredItems);
    return true;
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};
