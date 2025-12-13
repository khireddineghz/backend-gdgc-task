const express = require('express');
require('dotenv').config();

const itemRoutes = require('./routes/item.routes');
const aiRoutes = require('./routes/ai.routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/items', itemRoutes);
app.use('/ai', aiRoutes);

app.get('/info', (req, res) => {
  res.json({
    appName: process.env.APP_NAME,
    currentDate: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} is running on port ${PORT}`);
});
