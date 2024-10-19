import bycrypt from "bcrypt";
import User from "../models/user.schema.js";
import { revokeRefreshToken } from "../helpers/revokeRefreshToken.js";
import { sendRefreshToken } from "../helpers/sendRefreshToken.js";
import { createRefreshToken } from "../helpers/createTokens.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    res.status(200).send({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;

    await user.save();
    res.status(200).send({
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).send({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bycrypt.compareSync(
      req.body.Oldpassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    user.password = bycrypt.hashSync(req.body.Newpassword, 8);
    await user.save();

    // Revoke all refresh tokens for the user
    await revokeRefreshToken(user);

    // Send a new refresh token
    sendRefreshToken(res, createRefreshToken(user));

    res.status(200).send({
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // get all users except the current user
    const users = await User.find({ _id: { $ne: req.userId } });
    res.status(200).send(
      users.map((user) => ({
        _id: user._id,
        firstname: user.firstname,
        username: user.username,
        email: user.email,
        role: user.role,
        shifts: user.shifts,
      }))
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const modifyUserRole = async (req, res) => {
  try {
    const userToModify = await User.findById(req.body.userId);
    if (!userToModify) {
      return res.status(404).send({ message: "User Not found." });
    }
    userToModify.role = req.body.role;
    await userToModify.save();
    res.status(200).send({
      message: "User role updated successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).send(
      users.map((user) => ({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }))
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    // Revoke all refresh tokens for the user
    await revokeRefreshToken(user);

    await user.deleteOne();
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const users = await User.find();
    // get the percentage of users that are created by last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const recentUsers = users.filter((user) => user.createdat > lastMonth);
    // get the total number of users
    const totalUsers = users.length;
    // calculate the percentage
    const userPercentageLastMoth = (recentUsers.length / totalUsers) * 100;

    // get the total number of managers
    const managers = users.filter((user) => user.role === "manager");
    // get the percentage of managers that are created by last month
    const recentManagers = managers.filter(
      (manager) => manager.createdat > lastMonth
    );
    // calculate the percentage
    const managersPercentageLastMoth =
      (recentManagers.length / managers.length) * 100;

    // get the total number of operators
    const operators = users.filter((user) => user.role === "operator");
    // get the percentage of operators that are created by last month
    const recentOperators = operators.filter(
      (operator) => operator.createdat > lastMonth
    );
    // calculate the percentage
    const operatorsPercentageLastMoth =
      (recentOperators.length / operators.length) * 100;

    // get the percentage of of managers and operators
    const managersPercentage = (managers.length / totalUsers) * 100;
    const operatorsPercentage = (operators.length / totalUsers) * 100;

    res.status(200).send({
      users: totalUsers,
      managers: managers.length,
      operators: operators.length,
      userPercentageLastMoth,
      managersPercentageLastMoth,
      operatorsPercentageLastMoth,
      managersPercentage,
      operatorsPercentage,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
