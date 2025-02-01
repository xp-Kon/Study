const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const dishes = [
  { id: 1, name: '菜品A' },
  { id: 2, name: '菜品B' },
  { id: 3, name: '菜品C' }
];

app.get('/get-menu', (req, res) => {
  res.json({ dishes });
});

app.post('/submit-order', (req, res) => {
  const { tableNumber, dishes } = req.body;
  console.log(`桌号: ${tableNumber}, 菜品: ${dishes.join(', ')}`);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});