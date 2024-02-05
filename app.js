const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler.middleware");
const auth = require("./middlewares/auth.middleware");
const LoginRoute = require("./routes/index.routes");
const EventRoute = require("./routes/event.routes");
const CertificateRoute = require("./routes/certificate.routes");
const { CORS_ORIGIN } = require("./config");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/api", LoginRoute);

// app.use(auth);

app.use("/api/event", EventRoute);
app.use("/api/certificate", CertificateRoute);

app.use(errorHandler);

module.exports = app;