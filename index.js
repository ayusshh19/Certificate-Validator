require("dotenv").config();
const db = require("./config/db");
db();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const LoginRoute = require("./routes/LoginRoute");
const EventRoute = require("./routes/EventRoute");
const CertificateRoute = require("./routes/CertificateRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", LoginRoute);

app.use(authentication);

app.use("/api/event", EventRoute);
app.use("/api/certificate", CertificateRoute);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function startServer() {
  try {
    app.listen(8000, () => {
      console.log("Server listening on port 8000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the async function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
