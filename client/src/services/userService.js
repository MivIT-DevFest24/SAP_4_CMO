import { axiosInstance } from "@/services/apiConfig";

export const updateUserInfo = async (data) => {
  try {
    const response = await axiosInstance.put("user/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("user/profile");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addProductBookmark = async (productID, flag) => {
  try {
    const response = await axiosInstance.post(
      `user/addProductBookmark/${productID}/${flag}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const CheckProductBookmarks = async (productID, flag) => {
  try {
    const response = await axiosInstance.get(
      `user/checkProductBookmarks/${productID}/${flag}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const GetProductsBookmarks = async () => {
  try {
    const response = await axiosInstance.get(`user/productsBookmarks`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("user/all");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const modifyUserRole = async (data) => {
  try {
    const response = await axiosInstance.put("user/modifyUserRole", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getRecentUsers = async () => {
  try {
    const response = await axiosInstance.get("user/recent");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`user/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getStatistics = async () => {
  try {
    const response = await axiosInstance.get("user/statistics");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
