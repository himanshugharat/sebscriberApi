require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECT_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected"));

app.use(express.json());

const subscriberRouter = require("./routes/subscriber");
app.use("/subscriber", subscriberRouter);
app.listen(3000, console.log("listening at 3000"));
