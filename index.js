const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// settings
app.set("port", process.env.PORT || 5000);
var corsOpt = {
  origin: "*",
};
app.use(cors(corsOpt));

app.use(bodyparser.urlencoded({ limit: "15mb", extended: true }));
app.use(bodyparser.json({ limit: "15mb" }));

//init all web routes
app.use("/api", require("./routes/pedidos_routes"));

//Start Server
server.listen(app.get("port"), () => {
  console.log("BAMBAM pedidos Web Service on port ", app.get("port"));
});