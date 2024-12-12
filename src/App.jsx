import { useEffect, useState } from "react";

import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import log from "eslint-plugin-react/lib/util/log.js";
import { BrowserRouter, Routes, Route } from "react-router";

import PizzaBlock from './components/PizzaBlock'
import Cart from "./pages/Cart.jsx";
function App() {
  // const [count, setCount] = useState(0);


  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">

            <Routes>
              <Route path={'/'} element={<Home/>}/>
              <Route path={'*'} element={<NotFound/>}/>
              <Route path={'cart'} element={<Cart/>}/>
            </Routes>

        </div>
      </div>
    </>
  );
}

export default App;
