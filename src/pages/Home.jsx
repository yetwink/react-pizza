import {useEffect, useState, useContext, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import {sortList} from "../components/Sort.jsx";
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import Pagination from "../components/Pagination/index.jsx";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice.js";
import { fetchPizza } from "../redux/slices/pizzaSlice.js";




const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false)

  const {items, status} = useSelector((state) => state.pizza)

  const {searchValue, categoryId,currentPage } = useSelector(state => state.filter)
  const sortByType = useSelector((state) => state.filter.sort.sortProperty);


  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : "";
    const categoryUrl = categoryId ? `&category=${categoryId}` : "";
    dispatch(fetchPizza({
      currentPage,
      categoryUrl,
      sortByType,
      search
    }))
  };

  useEffect(() => {
    if (isMounted.current){
      const queryString = qs.stringify({
        sortByType: sortByType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true

  }, [categoryId, sortByType, searchValue, currentPage]);


  useEffect(()=>{
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(obj => obj.sortProperty === params.sortByType)

      dispatch(
          setFilters({
            ...params,
            sort
          })
      )
      isSearch.current = true;
    }

  }, [])


  useEffect(() => {
    if(!isSearch.current){
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortByType, searchValue, currentPage]);



  let skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  let allPizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{status === "loading" ? skeleton : allPizzas}</div>
        {
          status === "error"
            &&
              <div className="content__error">
                <h2>Огоооо, ошибочка (((</h2>
                <p>(ладно, братишка, потом зайди да)</p>
              </div>
        }
        <Pagination
          currentPage={currentPage}
          onChangePage={(number) => onChangePage(number)}
        />
      </div>
    </>
  );
};

export default Home;
