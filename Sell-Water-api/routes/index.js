var express = require("express");
var Product = require("../models/product");
var currencyFormatter = require("currency-formatter");
var router = express.Router();

const wrap = require("../utils/asyncWrapper");

/* GET home page. */
router.get(
  "/",
  wrap(async function(req, res, next) {
    const paramsUrl = req.query;
    console.log(paramsUrl);
    const findQuery = {
      deleted: false
    };
    if (paramsUrl.query) {
      findQuery.name = {
        $regex: paramsUrl.query
      };
    }
    var sort = paramsUrl.sort;
    console.log(sort);
    var order = paramsUrl.order ? (paramsUrl.order == "desc" ? -1 : 1) : 1;
    const products = await Product.find(findQuery, null, {
      sort: sort ? { [sort]: order } : { name: 1 }
    }).lean();

    const data = await Promise.all(
      products.map(v => ({
        ...v,
        image: v.image.replace(/\\/g, "/"),
        price: currencyFormatter.format(v.price, { code: "USD" })
      }))
    )
      .then(data => {
        res.statusCode = 200;
        return data;
      })
      .catch(err => {
        res.statusCode = 404;
        console.error(err);
      });
    res.send({
      products: data,
      query: paramsUrl.query,
      sort: paramsUrl.sort,
      order: paramsUrl.order
    });
  })
);

module.exports = router;
