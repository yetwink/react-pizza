import { createContext, useState } from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Routes, Route } from "react-router";
import {useSelector} from "react-redux";

import Cart from "./pages/Cart.jsx";
import CartEmpty from "./components/cartEmpty.jsx";


function App() {
  const cartItems = useSelector(state => state.cart.items)

  return (
    <>
      <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                  <Route path={'/'} element={<Home/>}/>
                  <Route path={'*'} element={<NotFound/>}/>
                  <Route path={'cart'} element={cartItems.length ? <Cart/> : <CartEmpty/>}/>
                </Routes>
            </div>
      </div>
    </>
  );
}

export default App;
