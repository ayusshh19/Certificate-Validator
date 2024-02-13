const express = require("express");
const cors = require("cors");
const { CORS_ORIGIN } = require("./config");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth.middleware");
const IndexRouter = require("./routes/index.routes");
const EventRouter = require("./routes/event.routes");
const CertificateRouter = require("./routes/certificate.routes");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", IndexRouter);

// app.use(auth);

app.use("/api/event", EventRouter);
app.use("/api/certificate", CertificateRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Certificate Generator");
});

app.use(errorHandler);

module.exports = app;
