import jwt from "jsonwebtoken";

export const createAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10d" }
  );
};

export const createRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, tokenversion: user.tokenversion},
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};
