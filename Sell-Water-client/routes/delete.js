var express = require("express");
var request = require("request");
var router = express.Router();
var product = require("../models/product");

router.get("/:id", async function(req, res, next) {
  var id = req.params.id;
  // console.log(id);
  // await product.findByIdAndUpdate(id, { deleted: true });

  request.delete(`http://localhost:3001/delete/${id}`, {}, () => {
    res.redirect("http://localhost:3000/admin");
  });
});

module.exports = router;
