import { axiosInstance } from "@/services/apiConfig";

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("auth/login", data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post("user/createUser", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const ChangePassword = async (data) => {
  try {
    const response = await axiosInstance.put("user/updatePassword", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axiosInstance.post("auth/forgetPassword", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.put(
      `auth/reset-password/${data.token}`,
      data.data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
