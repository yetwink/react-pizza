import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Index from "../components/PizzaBlock/index.jsx";
import axios from "axios";

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPizzas = async (url) => {
        try {
            setLoading(true);
            const response = await axios.get(
                url,
            );
            setPizzas(response.data);
            setLoading(false);
            return response.data;
        } catch (e) {
            console.error(e);
        } finally {
            console.log("finally fetch");
        }
    };

    const [filterByCategory, setFilterByCategory] = useState(0)
    const [sortByType, setSortByType] = useState('rating')

    // https://6758ac5360576a194d1170aa.mockapi.io/items?category=2&sortBy=rating&order=desc


    useEffect(() => {
        fetchPizzas(`https://6758ac5360576a194d1170aa.mockapi.io/items?&sortBy=${sortByType}&order=desc`);
        window.scrollTo(0,0)
    }, []);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories
                        fetchPizzas={fetchPizzas}
                        setFilterByCategory={setFilterByCategory}
                        sortByType={sortByType}
                    />
                    <Sort
                        fetchPizzas={fetchPizzas}
                        filterByCategory={filterByCategory}
                        setSortByType={setSortByType}
                    />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {
                        loading
                            ?
                            [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                            :
                            pizzas.map((item) => (
                                <Index key={item.id} {...item} />
                            ))
                    }
                </div>
            </div>
        </>
    );
};

export default Home;