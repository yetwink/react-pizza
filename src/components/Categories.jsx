import React, {useState} from "react";
import log from "eslint-plugin-react/lib/util/log.js";

export default function Categories({activeCategoryId, onClickCategory}) {

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    // const changeActiveCategory = (index) => {
    //     setActiveCategory(index)
    //     setFilterByCategory(index)
    //     if( index != 0){
    //       fetchPizzas(`https://6758ac5360576a194d1170aa.mockapi.io/items?sortBy&category=${index}&sortBy=${sortByType}&order=asc`)
    //         console.log(sortByType)
    //     } else {
    //         fetchPizzas(`https://6758ac5360576a194d1170aa.mockapi.io/items?sortBy=${sortByType}&order=asc`)
    //     }
    // }


    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => (
                     <li onClick={() => onClickCategory(index)}
                         className={index === activeCategoryId ? 'active' : '' }
                         key={index}>{item}
                     </li>
                    ))
                }
            </ul>
        </div>
    );
}