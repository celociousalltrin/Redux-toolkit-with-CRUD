import { createContext, useState, useContext } from "react";

export const UserContext = createContext({
  theme: null,
  toggleTheme: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <UserContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUserContext = () => {
  const { theme, toggleTheme } = useContext(UserContext);

  return { theme, toggleTheme };
};
