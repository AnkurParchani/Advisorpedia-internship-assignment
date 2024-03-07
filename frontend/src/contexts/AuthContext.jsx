import { createContext, useState } from "react";

export const AuthContext = createContext(undefined);

// Creating AuthContext to track the state of logged in user
const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
