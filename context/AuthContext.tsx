import type { AuthContextType, AuthProviderProps, User } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, removeData, storeData } from "../utils/data-storage";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getData("user");
      setUser(user);
    };
    getUser();
  }, []);

  const signIn = async (userData: User) => {
    await storeData("user", userData);
    setUser(userData);
  };

  const signOut = async () => {
    await removeData("user");
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
