require("dotenv").config();
const db = require("./config/db");
db();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

app.listen(port, () => console.log(`http://localhost:${port}`));
