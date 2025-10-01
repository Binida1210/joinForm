var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var joinFormRouter = require("./routes/joinForm");
var boardRouter = require("./routes/board");

var app = express();

// set CORS options to allow requests from specific origins
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:8080",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files folder
app.use(express.static(path.join(__dirname, "public")));

// Serve static files for jQuery
app.use(
  "/javascripts",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/joinForm", joinFormRouter);
app.use("/board", boardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;
