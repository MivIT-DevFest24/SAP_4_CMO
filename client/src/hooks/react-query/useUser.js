import { useMutation, useQuery } from "@tanstack/react-query";
import {
  updateUserInfo,
  getUserInfo,
  addProductBookmark,
  CheckProductBookmarks,
  GetProductsBookmarks,
  getAllUsers,
  getRecentUsers,
  modifyUserRole,
  deleteUser,
  getStatistics,
} from "@/services/userService";

export const useUpdateUserInfoMutation = () => {
  return useMutation({
    mutationFn: (data) => updateUserInfo(data),
  });
};

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });
};

export const useAddProductBookmark = (flag) => {
  return useMutation({
    mutationFn: (productID) => addProductBookmark(productID, flag),
    networkMode: "online",
  });
};

export const useCheckProductBookmarks = (productID, flag) => {
  return useQuery({
    queryKey: ["CheckProductBookmarks", productID, flag],
    queryFn: () => CheckProductBookmarks(productID, flag),
    networkMode: "online",
  });
};

export const useGetProductsBookmarks = () => {
  return useQuery({
    queryKey: ["ProductsBookmarks"],
    queryFn: () => GetProductsBookmarks(),
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["AllUsers"],
    queryFn: () => getAllUsers(),
  });
};

export const useGetRecentUsers = () => {
  return useQuery({
    queryKey: ["RecentUsers"],
    queryFn: () => getRecentUsers(),
  });
};

export const useModifyUserRole = () => {
  return useMutation({
    mutationFn: (data) => modifyUserRole(data),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id) => deleteUser(id),
  });
};

export const useGetStatistics = () => {
  return useQuery({
    queryKey: ["Statistics"],
    queryFn: () => getStatistics(),
  });
};
