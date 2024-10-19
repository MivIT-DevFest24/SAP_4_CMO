import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";
import bycrypt from "bcrypt";

import {
  createAccessToken,
  createRefreshToken,
} from "../helpers/createTokens.js";

import { sendRefreshToken } from "../helpers/sendRefreshToken.js";

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      role: req.body.role,
      sectors: req.body.sectors,
      email: req.body.email,
      password: bycrypt.hashSync(req.body.password, 8),
    });

    await user.save();

    res.status(201).send({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.email }, { email: req.body.email }],
    });

    if (!user) {
      res.status(404).send({ message: "User Not found." });
      return;
    }
    const passwordIsValid = bycrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      res.status(401).send({
        message: "Invalid Password!",
      });
      return;
    }

    // assigning the refresh token in httpOnly cookie
    sendRefreshToken(res, createRefreshToken(user));

    res.status(200).send({
      accessToken: createAccessToken(user),
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    // updating the token version to invalidate the refresh token
    const user = await User.findById(req.userId);
    user.tokenversion += 1;
    await user.save();

    sendRefreshToken(res, "");
    res.send({ message: "Logged out" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(203).send({ message: "No refresh token provided" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(203).send({ message: "Invalid refresh token" });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        if (user.tokenversion !== decoded.tokenversion) {
          return res.status(203).send({ message: "Invalid refresh token" });
        }

        sendRefreshToken(res, createRefreshToken(user));

        res.status(200).send({
          accessToken: createAccessToken(user),
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      }
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
