// require('dotenv').config()
import 'dotenv/config'
import express from "express";

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

let itemData = [];
let nextId = 1;

app.post("/", (req, res) => {
  const { name, price } = req.body;
  const newItem = { id: nextId++, name, price };
  itemData.push(newItem);
  res.status(201).send(newItem);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
