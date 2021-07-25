const express = require('express')
const {handleError, ApiError} = require("./app/helpers/error");
var cors = require("cors");
require("dotenv").config();
require("./app/middleware/auth");
const bodyParser = require('body-parser');
const passport = require("passport");


const app = express()
const db = require('./app/config/database');
db.once('open', function() {
    console.log('connected to database');
});



app.use(function (req, res, next) {
    res.apiSuccess = (data, message) => {
      res.json({
        success: true,
        message: message || "request successful",
        data
      });
    };
    res.apiFailure = (message, status = 400) => {
      res.status(status).json({
        success: false,
        message: message || "request failure",
      });
    };
    res.notFound = () => {
      res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Resource not found"
      });
    };
    
    next();
  });
app.use(cors());
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

const users = require("./app/routes/user");
const cars = require("./app/routes/car");
const comments = require("./app/routes/comment");
app.use(router);
app.use("/api/v1", users);
app.use("/api/v1/cars", cars);
app.use(
  "/api/v1/comments",
  passport.authenticate("jwt", { session: false }),
  comments
);

app.get('/error', (req, res) => {
    throw new ApiError(500, 'Internal server error');
})
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})