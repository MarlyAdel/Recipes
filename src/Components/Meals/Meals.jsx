import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Meals.scss';
import { PulseLoader } from 'react-spinners';
import MealsList from '../MealsList/MealsList';
import SelectedCategory from './../SelectedCategory/SelectedCategory';


export default function Meals() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [errorAPI, setErrorAPI] = useState("");

  async function getMeals(){

    try{
      setErrorAPI("");
      let {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);
      //console.log(data);
      setCategories(data.categories);
    }
    catch(error){
      console.log(error)
      setErrorAPI(error.message)
    }
  }

  useEffect(() => {
    getMeals();
  },[])

  return (
    <div className="container-meals">
      <div>
        <h1>Learn, Cook, Eat Your Food</h1>
      </div>
      {errorAPI ? <p>{errorAPI}</p> : null}

      <ul className="categories">
        {categories.length == 0 ? (
          <div className="loader">
            <PulseLoader color="orange" size={20} />
          </div>
        ) : (
          <>
            <li className={`${selectedCategory === "ALL" ? "active" : ""}`} onClick={() => setSelectedCategory("ALL")}>
              ALL
            </li>
            {categories.map((category) => (
              <li className={`${selectedCategory === category.strCategory ? "active" : ""}`}
                key={category.idCategory}
                onClick={() => setSelectedCategory(category.strCategory)}>
                {category.strCategory}
              </li>
            ))}
          </>
        )}
      </ul>
      {selectedCategory ? (
        <SelectedCategory selectedCategory={selectedCategory} />
      ) : (
        <MealsList />
      )}
    </div>
  );
}
