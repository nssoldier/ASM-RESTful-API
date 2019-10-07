var express = require("express");
var router = express.Router();
const multer = require("multer");

var product = require("../models/product");

const wrap = require("../utils/asyncWrapper");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

router.get("/:id", function(req, res, next) {
  product.findById(req.params.id, (err, value) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render("edit", {
      value
    });
  });
});

router.put(
  "/:id",
  upload.single("image"),
  wrap(function(req, res, next) {
    console.log(req.body);
    product.update(
      { _id: req.params.id, deleted: false },
      { ...req.body },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("edit success");
        res.send(result);
      }
    );
  })
);

module.exports = router;
