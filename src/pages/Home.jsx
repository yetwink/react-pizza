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
import { SearchContext } from "../App.jsx";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice.js";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false)

  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { searchValue } = useContext(SearchContext);


  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortByType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  // https://6758ac5360576a194d1170aa.mockapi.io/items?category=2&sortBy=rating&order=desc


  const fetchPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : "";
    const categoryUrl = categoryId ? `&category=${categoryId}` : "";
    let url = `https://6758ac5360576a194d1170aa.mockapi.io/items?page=${currentPage}&limit=4${categoryUrl}&sortBy=${sortByType}&order=asc${search}`;
    try {
      setLoading(true);
      const response = await axios.get(url);
      setPizzas(response.data);
      setLoading(false);
      return response.data;
    } catch (e) {
      console.error(e);
      setPizzas([]);
      setLoading(false);
    }
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

      console.log({...params, sort})
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
      fetchPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortByType, searchValue, currentPage]);



  let skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  let allPizzas = pizzas.map((item) => <PizzaBlock key={item.id} {...item} />);

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
        <div className="content__items">{loading ? skeleton : allPizzas}</div>
        <Pagination
          currentPage={currentPage}
          onChangePage={(number) => onChangePage(number)}
        />
      </div>
    </>
  );
};

export default Home;
