const router = require("express").Router();
const people = require("../schemaValidation/userschemaValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require("../middleware/validate");

let axios = require("axios");



router.post("/signup", async (req, res) => {
  let { email, password, otp } = req.body;
  if (email == " " || password == " ") {
    res.json({ message: "fields are required" });
  }
  let result = await people.findOne({ email: email });
  console.log(result);
  if (result) {
    res.json({ message: "user already exists" });
    return;
  }
  try {
    if (!result) {
      let hashpassword = await bcrypt.hash(password, 10);
      await people.create({
        email: email,
        password: hashpassword,
        otp: otp,
      });
      res.json({ message: "user created" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

// {match:{age:{$gt:20}}}

router.post("/login", async (req, res) => {
  console.log(req.body);
  let { email, password, otp } = req.body;
  console.log(email);
  if (email == " " || password == " " || otp == " ") {
    res.json({ message: "fields are required" });
    return;
  }
  try {
    let result = await people.findOne({ email: email });
    console.log(result);
    if (!result) {
      res.json({ message: "user not found" });
      return;
    } else {
      let compare = await bcrypt.compare(password, result.password);
      console.log(compare);
      if (compare) {
        let token = jwt.sign(req.body, "123", {
          expiresIn: 1000 * 60 * 60 * 24,
        });
        console.log(token);
        res.json(token);
      } else {
        res.json({ message: "password is incorrect" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

router.get("/get-all-users", validate, async (req, res) => {
  try {
    result = await people.find();
    res.json(result);
    console.log(result);
  } catch (error) {
    res.json(error, "server error");
  }
});

router.get("/server", (req, res) => {
  axios
    .post("http://localhost:3000/abc/a", {
      name: "helloo",
    })
    .then((response) => {
      console.log(response.data);

      res.json(response.data)
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
