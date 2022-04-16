import "./quote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClickContext } from "../context/ClickContext";
import { useContext, useEffect, useState } from "react";
import {
  faSortUp,
  faSortDown,
  faArrowsAltV,
} from "@fortawesome/free-solid-svg-icons";

export const Quote = () => {
  const [order, setOrder] = useState("ASC");
  const [icon, setIcon] = useState(faArrowsAltV);
  const { keyword, setKeyword, symbol } = useContext(ClickContext); // getting data from context

  useEffect(() => {
    // Quotes API getting stock symbol from context
    fetch(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`).then(
      (response) => {
        response.json().then((result) => {
          // console.log("result", result);
          // console.log(result.payload[symbol]);
          setKeyword(result.payload[symbol]);
        });
      }
    );
  }, []);

  function sorting(col) {
    // Sorting and storing it in context
    if (order === "ASC") {
      const sorted = [...keyword].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setKeyword(sorted);
      setOrder("DSC"); // Using the asyncronous behaviour of useState
      setIcon(faSortUp);
    }
    if (order === "DSC") {
      const sorted = [...keyword].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setKeyword(sorted);
      setOrder("ASC"); // Using the asyncronous behaviour of useState
      setIcon(faSortDown);
    }
  }
  return (
    <>
      <div id="quote" className="quote_page">
        <h3>QUOTE PAGE</h3>
        <h2>{symbol}</h2>
        <table id="customers">
          <thead>
            <tr>
              <th>Price</th>
              <th onClick={() => sorting("time")}>
                Time (Asc/Des) <nbsp />
                <FontAwesomeIcon icon={icon} color="red" />
              </th>
              <th>Validtill</th>
            </tr>
          </thead>
          <tbody>
            {keyword.map(
              (
                val,
                key // mapping the quotes data
              ) => (
                <tr>
                  <td>{val.price}</td>
                  <td>{val.time}</td>
                  <td>{val.valid_till}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
