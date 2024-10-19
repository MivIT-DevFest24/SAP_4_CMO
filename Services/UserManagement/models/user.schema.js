import mongoose from "mongoose";

const user = mongoose.model(
  "users",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["operator", "manager"], default: "operator" },
    sectors: [
      {
        type: String,
        enum: ["assembling engines", "welding frames", "painting bodies"],
        default: "assembling engines",
      },
    ],
    createdat: {
      type: Date,
      default: Date.now,
    },
    updatedat: { type: Date },
    tokenversion: { type: Number, default: 0 },
  })
);

export default user;
