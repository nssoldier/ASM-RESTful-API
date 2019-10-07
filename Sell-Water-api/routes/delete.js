var express = require("express");
var router = express.Router();
var product = require("../models/product");

const wrap = require("../utils/asyncWrapper");

router.delete(
  "/:id",
  wrap(async function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    await product.findByIdAndUpdate(id, { deleted: true });
    res.redirect("http://localhost:3000/admin");
  })
);

module.exports = router;
