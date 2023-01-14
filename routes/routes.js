const express = require("express");
const router = express.Router();
const authenticate = require("../utilities/authenticate");
let products = [
  {
    id: 0,
    name: "Ikigai book",
    price: 230,
    is_available: true,
  },
  {
    id: 1,
    name: "Sunglass",
    price: 400,
    is_available: false,
  },
  {
    id: 2,
    name: "Jacket",
    price: 1230,
    is_available: true,
  },
  {
    id: 3,
    name: "Fisherman hat",
    price: 530,
    is_available: true,
  },
];

router.get("/get-all-products", (req, res) => {
  res.status(200).json({
    products: products,
  });
});

router.get("/get-product/:id", (req, res) => {
  let id = req.params.id;
  try {
    if (products[id]) {
      res.status(200).json({
        product: products[id],
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/add-product", (req, res) => {
  try {
    if (authenticate(req)) {

      let body = req.body;
      let name = body.name
      let price = body.price

      if(name && price){
        products.push({
            id:products.length,
            
            name:name,
            price:price,
            is_available:true,
    
          })
      }
      

      res.status(200).json(products);
    } else {
      res.status(400).json({
        message: "Token required",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
