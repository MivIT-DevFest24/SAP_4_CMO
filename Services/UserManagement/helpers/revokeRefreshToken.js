export const revokeRefreshToken = async (user) => {
  user.tokenversion += 1;
  await user.save();
};
