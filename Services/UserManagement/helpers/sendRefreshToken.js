export const sendRefreshToken = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true, // only accessible by server
    path: "/api/auth/refresh", // only accessible by server route '/api/auth/refresh'
    secure: true, // only accessible by https
    sameSite: "none", // only accessible by same site
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
