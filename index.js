// require('dotenv').config()
import 'dotenv/config'
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

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
