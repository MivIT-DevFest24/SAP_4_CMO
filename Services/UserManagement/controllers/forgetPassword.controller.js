import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import nodemailer from "nodemailer";
import { revokeRefreshToken } from "../helpers/revokeRefreshToken.js";

export const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    var transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Reset your password account in Car-F website",
      html: `<h1>Link to reset your password</h1>
    <p>Click the following link to reset your password</p>
    <a href="${process.env.PRODUCTION_URL}/reset-password/${token}">${process.env.PRODUCTION_URL}/reset-password/${token}</a>
    <p>Link will expire in 15 minutes</p>
    <p>If you have not requested a password reset, please ignore this email</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Handle token verification and password update
export const resetPassword = async (req, res) => {
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }

    // crypt the new password
    user.password = bycrypt.hashSync(req.body.Newpassword, 8);

    await user.save();

    // Revoke all refresh tokens for the user
    await revokeRefreshToken(user);

    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
