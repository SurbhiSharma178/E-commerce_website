const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secretKey = process.env.KEY;

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(" Not Valid email address")
      }
    },
    trim: true
  },
  mobile: {
    type: Number,
    require: true,
    unique: true,
    maxlength: 10
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  confirm_password: {
    type: String,
    required: true,
    minlength: 6
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ],
  carts: Array
})


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirm_password = await bcrypt.hash(this.confirm_password, 12);
  }
  next();
})

// token genrate
userSchema.methods.generateAuthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, secretKey)
    this.tokens = this.tokens.concat({ token: token })
    await this.save();
    return token;
  } catch (error) {
    console.log("Error " + error.message);
  }
}

// addToCart data
userSchema.methods.addcartdata= async function(cart){
  try {
    this.carts= this.carts.concat(cart);
    await this.save();
    return this.carts
  } catch (error) {
    console.log("Error "+ error.message);
  }
}

const USER = new mongoose.model("USER", userSchema)

module.exports = USER;