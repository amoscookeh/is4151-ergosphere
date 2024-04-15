import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  deviceId: string;
  userId: string;
  login: () => void;
  logout: () => void;
  setDevice: (id: string) => void;
  setUser: (id: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const setDevice = (id: string) => setDeviceId(id);
  const setUser = (id: string) => setUserId(id);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        deviceId,
        userId,
        login,
        logout,
        setDevice,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
