import { useEffect, useState, useContext } from "react";
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import axios from "axios";
import Pagination from "../components/Pagination/index.jsx";
import {SearchContext} from "../App.jsx";
import { useSelector} from "react-redux";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { searchValue } = useContext(SearchContext)

  const fetchPizzas = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setPizzas(response.data);
      setLoading(false);
      return response.data;
    } catch (e) {
      console.error(e);
      setPizzas([]);
      setLoading(false)
    }
  };

  const categoryId = useSelector((state) => state.filter.categoryId)
  const sortByType = useSelector((state) => state.filter.sort.sortProperty)



  // https://6758ac5360576a194d1170aa.mockapi.io/items?category=2&sortBy=rating&order=desc

  const search = searchValue ? `&search=${searchValue}` : "";
  const categoryUrl = categoryId ? `&category=${categoryId}` : "";

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setLoading(true);
    let url = `https://6758ac5360576a194d1170aa.mockapi.io/items?page=${currentPage}&limit=4${categoryUrl}&sortBy=${sortByType}&order=asc${search}`;
    fetchPizzas(url);
    window.scrollTo(0, 0);
  }, [categoryId, sortByType, searchValue,currentPage]);

  let skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  let allPizzas = pizzas.map((item) => <PizzaBlock key={item.id} {...item} />);



  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories/>
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{loading ? skeleton : allPizzas}</div>
          <Pagination
              onChangePage={(number) => setCurrentPage(number)}
          />
      </div>
    </>
  );
};

export default Home;