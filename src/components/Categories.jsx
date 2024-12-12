import React, {useState} from "react";

export default function Categories({fetchPizzas, setFilterByCategory, sortByType}) {

    const [activeCategory, setActiveCategory] = useState(0)

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    const changeActiveCategory = (index) => {
        setActiveCategory(index)
        setFilterByCategory(index)
        if( index != 0){
          fetchPizzas(`https://6758ac5360576a194d1170aa.mockapi.io/items?sortBy&category=${index}&sortBy=${sortByType}&order=desc`)
        } else {
            fetchPizzas('https://6758ac5360576a194d1170aa.mockapi.io/items')
        }
    }


    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => (
                     <li onClick={() => changeActiveCategory(index)}
                         className={index === activeCategory ? 'active' : '' }
                         key={index}>{item}
                     </li>
                    ))
                }
            </ul>
        </div>
    );
}