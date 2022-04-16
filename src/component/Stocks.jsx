import React, { useContext, useEffect, useState } from "react";
import "./stocks.css";

import { csv } from "d3";
import { useNavigate } from "react-router-dom";
import { ClickContext } from "../context/ClickContext";
import { Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Stocks = () => {
  const [list, setList] = useState([]);

  const [searchTitle, setSearchTitle] = useState("");

  const { setSymbol } = useContext(ClickContext);

  useEffect(() => {
    // getting instruments data from api
    csv("https://prototype.sbulltech.com/api/v2/instruments").then((data) => {
      setList(data);
      console.log(data);
    });
  }, []);

  var navigate = useNavigate();
  function clickMe(item) {
    // Storing the stock symbol in context and navigating to quotes page
    console.log(item.Symbol);
    setSymbol(item.Symbol);

    navigate("/quotes");
  }

  return (
    <>
      <div className="stock_page">
        <h3>STOCK-PAGE</h3>
        <div className="search_box">
          <Input
            id="input-with-icon-adornment"
            placeholder="Search"
            onChange={(event) => setSearchTitle(event.target.value)} // storing the title typed for filtering
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </div>
        <br />
        <div className="stock_table">
          <table id="customers">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Sector</th>
                <th>Validtill</th>
              </tr>
            </thead>
            <tbody>
              {list
                .filter((value) => {
                  // filter according to title
                  if (searchTitle === "") {
                    return value;
                  } else if (
                    value.Name.toLowerCase().includes(searchTitle.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((item, i) => (
                  // mapping the filtered data
                  <tr>
                    <td>
                      <h3 onClick={() => clickMe(item)}>{item.Symbol}</h3>
                    </td>
                    <td>{item.Name}</td>
                    <td>{item.Sector}</td>
                    <td>{item.Validtill}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
