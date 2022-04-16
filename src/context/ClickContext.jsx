import { createContext, useState } from "react";

export const ClickContext = createContext(); // context created

export const ClickContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState([]); // for storing sorted quotes data
  const [symbol, setSymbol] = useState(null); // for storing the stock symbol and accessing it in quotes page

  return (
    <ClickContext.Provider value={{ keyword, setKeyword, symbol, setSymbol }}>
      {children}
    </ClickContext.Provider>
  );
};
