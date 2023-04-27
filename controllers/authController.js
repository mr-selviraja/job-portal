import bcrypt from "bcryptjs";

import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // validate data
    if (!name) {
      next("Please provide the name");
    }
    if (!email) {
      next("Please provide the e-mail");
    }
    if (!password) {
      next("Please provide the e-mail");
    }

    // check the stored data
    const isUserExisting = await userModel.findOne({ email });

    if (isUserExisting) {
      return res.status(200).send({
        success: true,
        message: "Email is already existing!",
      });
    }

    // store the data
    const newUser = {
      name: name,
      email: email,
      password: bcrypt.hashSync(password),
    };

    const user = userModel.create(newUser);
    res.status(200).send({
      success: true,
      message: "User is registered Successfully!",
      user,
    });
  } catch (err) {
    next(`Error in authcontroller:\n${err}`);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next("provide all fields");
    }

    const user = await userModel.findOne({ email });
    console.log(`User found: , ${user}`);

    if (!user) {
      next("Invalid email address");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        message: "Password incorrect!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      user,
    });
  } catch (err) {
    console.log(`Error in loginController: ${err}`);
  }
};
