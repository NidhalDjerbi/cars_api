const router = require("express").Router();
const carController = require("../controllers/CarController");
const Car = require("../models/car");

router
  .route("/cars")
  .get(carController.getCars)

router.get("/",function (req, res) {
res.send('cars page');
})
module.exports = router;
