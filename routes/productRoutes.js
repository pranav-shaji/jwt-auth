const router = require("express").Router();
const mongoose = require("mongoose");
const product = require("../schemaValidation/productschemaValidation");
const validate = require('../middleware/validate')
const jwt = require("jsonwebtoken");



router.post("/add-products", async (req, res) => {
  console.log("hgffcnj");
  try {
    await product.insertMany(req.body);
    res.json({ message: "products inserted sucessfully" });
  } catch (error) {
    res.json({ message: "products not inserted", error });
  }
});
router.post("/add-a-product", async (req, res) => {
  try {
    let result = await product.find({
      name: req.body.name,
      brand: req.body.brand,
    });
    if (result.length > 0) {
      res.json({ message: "product already exists" });
      return;
    }
    await product.create(req.body);
    res.json({ message: "product added" });
  } catch (error) {
    console.log(error);
    res.json({ message: "error adding product", error: error });
  }
});
router.patch("/update-product/:id", async (req, res) => {
  if (req.body.price) {
    req.body.priceUpdatedAt = new Date();
  }

  try {
    let result = await product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          priceUpdatedAt: req.body.priceUpdatedAt,
          name: req.body.name,
          brand: req.body.brand,
          category: req.body.category,
          price: req.body.price,
        },
      }
    );
    console.log(result);
  } catch (error) {
    res.json({message:"server error"})
    console.log(error);
  }
});

router.get('/get-all-products',validate,async(req,res)=>{
try {
   let result = await product.find()
   res.json({message:"list of products are-",result})
} catch (error) {
    console.log(error);
    res.json({messsage:"error connecting database"})
}
})



router.delete('/delete-document/:id',async(req,res)=>{
    try {
        let result = await product.findByIdAndRemove(req.params.id)
        //findbyidandremove
        console.log(result);
        res.json({message:"product field deleted"})
    } catch (error) {
        res.json({message:"error connecting server",error})
    }
})

router.patch("/delete-Fields")

module.exports = router;
