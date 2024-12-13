import React, { useState } from "react";
import log from "eslint-plugin-react/lib/util/log.js";

export default function Categories({ activeCategoryId, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={index === activeCategoryId ? "active" : ""}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
