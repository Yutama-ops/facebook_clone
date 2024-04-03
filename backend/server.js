const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

//ROUTES
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//DB
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log("DB Connect Success"))
  .catch((err) => console.log("DB Connection error", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}...`);
});
