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
  const { keyword, setKeyword, symbol, setSymbol } = useContext(ClickContext);
  const [date, setDate] = useState();

  // setDate(new Date());
  // useEffect(() => {
  //   let datevariable = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  //   console.log(datevariable);
  //   setDate(datevariable);
  // }, []);

  useEffect(() => {
    fetch(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`).then(
      (response) => {
        response.json().then((result) => {
          console.log("result==>", result);
          console.log(result.payload[symbol]);
          setKeyword(result.payload[symbol]);
        });
      }
    );
  }, []);

  function sorting(col) {
    if (order === "ASC") {
      const sorted = [...keyword].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setKeyword(sorted);
      setOrder("DSC");
      setIcon(faSortUp);
    }
    if (order === "DSC") {
      const sorted = [...keyword].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setKeyword(sorted);
      setOrder("ASC");
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
                Time <FontAwesomeIcon icon={icon} color="red" />
              </th>
              <th>Validtill</th>
            </tr>
          </thead>
          <tbody>
            {keyword.map((val, key) => (
              <tr>
                <td>{val.price}</td>
                <td>{val.time}</td>
                <td>{val.valid_till}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
