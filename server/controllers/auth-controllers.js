const User = require("../models/userModel");
const {hashPassword, comparePassword} = require("../helpers/auth-helper");
const JWT = require("jsonwebtoken");

const home = (req, res) => {
  try {
    res.status(200).send("This is a Home Page using Controllers");
  } catch (error) {
    console.error(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, answer } = req.body;
    // validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }

    if (!email) {
      return res.send({ message: "Email is required" });
    }

    if (!password) {
      return res.send({ message: "Password is required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    // if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(200).send({
        success: false,
        message: "Already registered! Please login.",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      answer,
    });

    res.status(201).send({
      success: true,
      message: `User Registered Successfully`,
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Error in Registration`,
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

module.exports = { home, register, login, translateReview, postReview };
