import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [role, setRole] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openForgetPassword, setOpenForgetPassword] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        connected,
        setConnected,
        role,
        setRole,
        firstName,
        setFirstName,
        openLogin,
        setOpenLogin,
        openForgetPassword,
        setOpenForgetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
