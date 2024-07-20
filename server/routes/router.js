const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema")
const SecondSlide = require("../models/productsSchema2")
const User = require("../models/userSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs")
const athenticate = require("../middleware/authenticate")

// Get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log("Console data" + productsdata);
    res.status(201).json(productsdata);

  } catch (error) {
    console.log("Error " + error.messge);
  }
})

// Get Productdata of second slide

router.get("/secondslideproduct", async (req, res) => {
  try {
    const slide2Data = await SecondSlide.find();
    // console.log("console data " +slide2Data);
    res.status(201).json(slide2Data);
  } catch (error) {
    console.log("Error " + error.messge);
  }
})


// get indivaidual data 
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const individualData = await Products.findOne({ id: id })
    // console.log(individualData + "individual data");
    res.status(201).json(individualData)

  } catch (error) {
    res.status(400).json(individualData)
    console.log("Error " + error.message);
  }
})

// get indivaidual data of second slide
router.get("/getproductstwo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const individualData = await SecondSlide.findOne({ id: id })
    // console.log(individualData + "individual data");

    res.status(201).json(individualData)
  } catch (error) {
    res.status(400).json(individualData)
    console.log("Error " + error.messge);
  }
})


// register Data
router.post("/register", async (req, res) => {
  console.log(req.body);

  const { fname, email, mobile, password, confirm_password } = req.body;
  if (!fname || !email || !mobile || !password || !confirm_password) {
    res.status(422).json({ error: "fill all Data" })
    console.log("No Data Avilable");
  };

  try {
    const presentUser = await USER.findOne({ email: email });

    if (presentUser) {
      res.status(422).json({ error: "This user is Already Present" })
    } else if (password != confirm_password) {
      res.stauts(422).json({ error: "Password doesn't match" })
    } else {
      const finalUser = new USER({  
        fname, email, mobile, password, confirm_password
      });

      // hashing algrothim -> bcryptjs

      // password hashing process

      const storeData = await finalUser.save();
      console.log("data on console" + storeData);

      res.status(201).json(storeData);
    };
  } catch (error) {
    console.log("Error " + error.message);
  };

})

// Login user api
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "fill all data" })
  };
  try {
    const userLogin = await USER.findOne({ email: email })
    console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password)
      // console.log(isMatch)

      // token genrate
      const token = await userLogin.generateAuthtoken();
      // console.log(token);

      // cookie generta
      res.cookie("Amazonweb",token, {
        expires:new Date(Date.now() + 900000),
        httpOnly:true
      })

      if (!isMatch) {
        res.status(400).json({ error: "Enter correct password" })
      } else {
        res.status(201).json(userLogin)
      }
    }else{
      res.status(400).json({ error: "Invalid Details" })
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details" })
  }
})

// adding data into cart
router.post("/addcart/:id",athenticate, async(req,res)=>{
  try {
    const {id}= req.params;
    const cart = await Products.findOne({id:id});
    console.log(cart +"cart value");

    const UserContact = await USER.findOne({_id:req.userId})
    console.log(UserContact);

    if(UserContact){
      const cartData= await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact)
    }else{
      res.status(401).json({error:"Invalid user"})
    }

  } catch (error) {
    console.log("error "+ error.message)
  }
})


// Get carts details
router.get("/cartdetails",athenticate,async(req,res)=>{
  try {
    const buyuser= await USER.findOne({_id:req.userId});
    res.status(201).json(buyuser);
  } catch (error) {
    console.log("Error "+error.message);
  }
})

module.exports = router;