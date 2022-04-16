import { createContext, useState } from "react";

export const ClickContext = createContext();

export const ClickContextProvider = ({ children }) => {
  // const [token, setToken] = useState(10);
  const [keyword, setKeyword] = useState([]);
  const [symbol, setSymbol] = useState(null);

  return (
    <ClickContext.Provider value={{ keyword, setKeyword, symbol, setSymbol }}>
      {children}
    </ClickContext.Provider>
  );
};
