var express = require("express");
var request = require("request");
var router = express.Router();
var Product = require("../models/product");
var currencyFormatter = require("currency-formatter");

/* GET home page. */
var multer = require("multer");
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
    fileSize: 1024 * 1024 * 10
  }
});
router.post("/add", upload.single("image"), async (req, res, next) => {
  // let product = new Product({
  //   ...req.body,
  //   deleted: false
  // });

  const data = { ...req.body };

  if (req.file) {
    data.image = req.file.path;
  }

  // console.log(new FormData(data));

  const isAdd = await request(
    {
      url: "http://localhost:3001/admin/add",
      method: "POST",
      json: data
    },
    (err, resp, body) => {
      if (body) {
        res.redirect("http://localhost:3000/admin");
      }
    }
  );

  // product.save(err => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log("success");
  // });
});

router.get("/", async (req, res, next) => {
  const paramsUrl = req.query;
  // let pageSize = req.query.pageSize
  //   ? new Number(req.query.pageSize) <= 0
  //     ? 3
  //     : new Number(req.query.pageSize)
  //   : 4;
  // let page = req.query.page
  //   ? new Number(req.query.page) <= 0
  //     ? 1
  //     : new Number(req.query.page)
  //   : 1;
  // const products = await Product.find({ deleted: false })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1))
  //   .lean();

  // const length = await Product.countDocuments({ deleted: false });

  // if (length < pageSize && !req.query.pageSize) {
  //   pageSize = length;
  // }
  // const data = await Promise.all(
  //   products.map(v => ({
  //     ...v,
  //     price: currencyFormatter.format(v.price, { code: "USD" })
  //   }))
  // )
  //   .then(data => data)
  //   .catch(err => console.error(err));

  const data = await request(
    `http://localhost:3001/admin?page=${paramsUrl.page ||
      ""}&pageSize=${paramsUrl.pageSize || ""}`,
    (err, response, data) => {
      console.log(JSON.parse(data));
      res.render("admin", {
        title: "Admin",
        ...JSON.parse(data)
      });
    }
  );

  // res.render("admin", {
  //   title: "Admin",
  //   products: data,
  //   page,
  //   pageSize,
  //   length
  // });
});

// router.post("/", upload.single("image"), async (req, res, next) => {
//   if (req.body.name) {
//     await Product.create({
//       name: req.body.name,
//       price: req.body.price,
//       type: req.body.type,
//       desc: req.body.desc,
//       image: req.file.path
//     });
//   }

//   const products = await Product.find({ deleted: false }).lean();
//   const data = await Promise.all(
//     products.map(v => ({
//       ...v,
//       price: currencyFormatter.format(v.price, { code: "USD" })
//     }))
//   )
//     .then(data => data)
//     .catch(err => console.error(err));

//   res.render("admin", { title: "Express", products: data });
// });

module.exports = router;
