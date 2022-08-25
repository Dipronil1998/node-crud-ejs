const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config/boostrap');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isLogin: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.salt);
  }
  next();
});

userSchema.methods.generateAuthToken = async function (isLogin) {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
        email: this.email,
        isLogin: isLogin
      },
      config.secretKey,
      { expiresIn: "1h" }
    );
    await this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);