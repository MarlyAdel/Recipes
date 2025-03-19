import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function SelectedCategory({ selectedCategory }) {

    const [theMeals , setTheMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getSelectedCategory(category){
        setLoading(true);
       try {
        let { data } = await axios.get(
          `${
            selectedCategory === "ALL"
              ? "https://www.themealdb.com/api/json/v1/1/search.php?s="
              : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          }`
        );
        //console.log(data);
        setTheMeals(data.meals);
       } 
       catch (error) {
        console.log(error);
       }
       finally {
      setLoading(false);
    }
    }

    useEffect(() => {
      
        getSelectedCategory(selectedCategory);
      
    }, [selectedCategory]);


  return (
    <div>
      <div className="foods">
        {loading ? (
          <p>Loading Meals...</p>
        ) : theMeals.length > 0 ? (
          theMeals.map((theMeal) => (
            <div className="meal" key={theMeal.idMeal}>
              <img src={theMeal.strMealThumb} width={"200px"} alt="Meals" />
              <div className="meal-content">
                <h3>{theMeal.strMeal.split(" ").splice(0, 2).join(" ")}</h3>
                {theMeal.strArea != undefined && (
                  <h5>
                    <i class="fa-solid fa-earth-americas"></i> {theMeal.strArea}
                  </h5>
                )}
                <Link to={`/mealsDetails/${theMeal.idMeal}`}>View Recipe</Link>
              </div>
            </div>
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
