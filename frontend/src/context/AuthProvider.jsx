import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
    })

    const login = (userData) => {
        setUser(userData)
        console.log("user data: ", userData)
        localStorage.setItem("user", JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
