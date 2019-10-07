var express = require("express");
var request = require("request");
var router = express.Router();
const multer = require("multer");

var product = require("../models/product");

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

router.post("/:id", upload.single("image"), async function(req, res, next) {
  // product.update(
  //   { _id: req.params.id, deleted: false },
  //   req.file ? { ...req.body, image: req.file.path } : { ...req.body },
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log("insert success");
  //     res.redirect("http://localhost:3000/admin");
  //   }
  // );

  const data = { ...req.body };

  if (req.file) {
    data.image = req.file.path;
  }

  // console.log(new FormData(data));

  await request(
    {
      url: `http://localhost:3001/edit/${req.params.id}`,
      method: "PUT",
      json: data
    },
    (err, resp, body) => {
      if (body) {
        res.redirect("http://localhost:3000/admin");
      }
    }
  );
});

module.exports = router;
