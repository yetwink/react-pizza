import { createContext, useState } from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Routes, Route } from "react-router";

import Cart from "./pages/Cart.jsx";

export const SearchContext = createContext();

function App() {
  // const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");


  return (
    <>
      <div className="wrapper">

        <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <div className="content">

                <Routes>
                  <Route path={'/'} element={<Home/>}/>
                  <Route path={'*'} element={<NotFound/>}/>
                  <Route path={'cart'} element={<Cart/>}/>
                </Routes>

            </div>
        </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;
