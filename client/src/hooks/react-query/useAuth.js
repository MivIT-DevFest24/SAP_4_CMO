import { useMutation } from "@tanstack/react-query";
import {
  login,
  createUser,
  ChangePassword,
  forgotPassword,
  resetPassword
} from "@/services/authService.js";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data) => login(data),
  });
};

export const useChangePasswordMutatuion = () => {
  return useMutation({
    mutationFn: (data) => ChangePassword(data),
  });
};

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (data) => createUser(data),
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data) => forgotPassword(data),
  });
};

export const useResetPasswordMutatuion = () => {
  return useMutation({
    mutationFn: (data) => resetPassword(data),
  });
};
