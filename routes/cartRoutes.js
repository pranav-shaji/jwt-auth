const router = require("express").Router();
const mongoose = require("mongoose");
const cart = require("../schemaValidation/cartShemaValidation");

router.post("/add-to-cart/:userId/:productId", async (req, res) => {
  try {
    let cartExist = await cart.findOne({ userId: req.params.userId });

    if (cartExist == null) {
      await cart.create({
        userId: req.params.userId,
        products: [
          {
            productId: req.params.productId,
            count: 1,
          },
        ],
      });
      res.json({ message: "product updated" });
    } else {
      productexit = await cart.findOne({
        productId: req.params.productId,
      });//if product exists if will add the count
      if (productexit) {
        let result = await cart.updateOne(
          {
            userId: req.params.userId,
            "products.productId": req.params.productId,
          },
          {
        $inc: { "products.$.count": 1 },
          }
        );
        res.json({ message: "product count updated" });

        console.log(result);
      } else {
        await cart.updateOne(
          {
            userId: req.params.userId,
          },
          {
            $push: {
              products: { productId: req.params.productId, count: 1 },
            },
          }
        );
        res.json({ message: "updated product count" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});




// router.post("/add-to-cart/:userId/:productId", async (req, res) => {
//   try {
//     let cartExist = await cart.findOne({ userId: req.params.userId });

//     if (cartExist == null) {
//       await cart.create({
//         userId: req.params.userId,
//         products: [
//           {
//             productId: req.params.productId,
//             count: 1,
//           },
//         ],
//       });
//       res.json({ message: "product added to cart" });
//     } else {
//       let product = cartExist.products.find(product => product.productId === req.params.productId);

//       if (product) {
//         // If product exists, increment the count
//         await cart.findOneAndUpdate(
//           { userId: req.params.userId, "products.productId": req.params.productId },
//           { $inc: { "products.$.count": 1 } }
//         );
//         res.json({ message: "product count updated" });
//       } else {
//         // If product doesn't exist, add it to the cart
//         await cart.findOneAndUpdate(
//           { userId: req.params.userId },
//           { $push: { products: { productId: req.params.productId, count: 1 } } }
//         );
//         res.json({ message: "product added to cart" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "error" });
//   }
// });



module.exports = router;
