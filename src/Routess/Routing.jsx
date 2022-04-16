import { Routes, Route } from "react-router";
import { Quote } from "../component/Quote";
import { Stocks } from "../component/Stocks";

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/instruments" element={<Stocks />}></Route>
        <Route path="/quotes" element={<Quote />}></Route>
      </Routes>
    </>
  );
};
