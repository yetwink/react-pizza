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

    const [activeCategoryId, setActiveCategoryId] = useState(0)

    const onChangeCategory = (id) => {
        setActiveCategoryId(id)
        let url = `https://6758ac5360576a194d1170aa.mockapi.io/items?sortBy=${sortByType}&order=desc`
        if(id !== 0) {
            url = `https://6758ac5360576a194d1170aa.mockapi.io/items?category=${id}&sortBy=${sortByType}&order=desc`
        }
        fetchPizzas(url)
    }

    const [sortByType, setSortByType] = useState('rating')
    const [sortPopupOpen, setSortPopupOpen] = useState(false);
    const list = ["rating", "price", "title"];
    const [selected, setSelected] = useState(0);

    const onChangeSort = (id) => {
        setSortByType(list[id])
        setSelected(id)
        setSortPopupOpen(false)
        let url =`https://6758ac5360576a194d1170aa.mockapi.io/items?sortBy=${list[id]}&order=desc`
        if(activeCategoryId !== 0){
            url = `https://6758ac5360576a194d1170aa.mockapi.io/items?category=${activeCategoryId}&sortBy=${list[id]}&order=desc`
        }
        fetchPizzas(url)
    }

    // https://6758ac5360576a194d1170aa.mockapi.io/items?category=2&sortBy=rating&order=desc


    useEffect(() => {
        fetchPizzas(`https://6758ac5360576a194d1170aa.mockapi.io/items`);
        window.scrollTo(0,0)
    }, []);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories
                        activeCategoryId={activeCategoryId}
                        onClickCategory={(id) => onChangeCategory(id)}
                    />
                    <Sort
                        list={list}
                        selected={selected}
                        sortByType={sortByType}
                        onChangeSort={(sortType) => onChangeSort(sortType)}
                        sortPopupOpen={sortPopupOpen}
                        setSortPopupOpen={setSortPopupOpen}
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