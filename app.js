var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { connectToMongoDB } = require('./config/mongo.connection');
const cors = require("cors");
const authLogMiddleware = require('./middleware/logsMiddlewares');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var carsRouter = require('./routes/cars.routes');

const http = require('http');

require('dotenv').config();

var app = express();


// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authLogMiddleware); // Appliquer le middleware de logs à toutes les routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

const server = http.createServer(app); 

server.listen(process.env.PORT, () => {
  connectToMongoDB(),
  console.log(`Server is running on port ${process.env.PORT}`);
});