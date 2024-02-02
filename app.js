require("dotenv").config();
const db = require("./config/db");
db();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const EventRoute = require("./routes/EventRoute");
const CertificateRoute = require("./routes/CertificateRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/event", EventRoute);
app.use("/api/certificate", CertificateRoute);

app.use(errorHandler);

async function startServer() {
  try {
    app.listen(8000, () => {
      console.log("Server listening on port 8001");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the async function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
