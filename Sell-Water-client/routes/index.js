var express = require("express");
var Product = require("../models/product");
var currencyFormatter = require("currency-formatter");
var request = require("request");
var router = express.Router();

/* GET home page. */
router.get("/", async function(req, res, next) {
  const paramsUrl = req.query;
  // console.log(paramsUrl);
  // const findQuery = {
  //   deleted: false
  // };
  // if (paramsUrl.query) {
  //   findQuery.name = {
  //     $regex: paramsUrl.query
  //   };
  // }
  // var sort = paramsUrl.sort;
  // var order = paramsUrl.order ? (paramsUrl.order == "desc" ? -1 : 1) : 1;
  // const products = await Product.find(findQuery, null, {
  //   sort: sort ? { [sort]: order } : { name: 1 }
  // }).lean();

  // const data = await Promise.all(
  //   products.map(v => ({
  //     ...v,
  //     image: v.image.replace(/\\/g, "/"),
  //     price: currencyFormatter.format(v.price, { code: "USD" })
  //   }))
  // )
  //   .then(data => data)
  //   .catch(err => console.error(err));

  const data = await request(
    `http://localhost:3001?sort=${paramsUrl.sort ||
      ""}&order=${paramsUrl.order || ""}&query=${paramsUrl.query || ""}`,
    (err, response, data) => {
      console.log(JSON.parse(data));
      res.render("index", {
        title: "Homepage",
        ...JSON.parse(data)
      });
    }
  );
});

module.exports = router;
