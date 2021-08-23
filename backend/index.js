const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

dbConnection();