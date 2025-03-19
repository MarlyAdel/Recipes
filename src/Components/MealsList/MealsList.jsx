import axios from 'axios'
import React, { useEffect, useState } from 'react';
import './MealsList.scss'
import { Link } from 'react-router-dom';

export default function MealsList() {

    const [meals, setMeals] = useState([]);
    const [errorAPI, setErrorAPI] = useState("")

  async function getMealsList(){
    
   try{
    setErrorAPI("");
    let {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    //console.log(data);
    if(!data.meals) throw new Error("There is no meals")

    setMeals(data.meals);
   }
   catch(error){
   console.log(error);
   setErrorAPI(error.message);
}
}

useEffect(() => {
    getMealsList();
},[])


  return (
    <div>
      {errorAPI ? <p>{errorAPI}</p> : null}

      <div className="foods">
        {meals.map((meal) => (
          <div className="meal" key={meal.idMeal}>
            <img src={meal.strMealThumb} width={"200px"} alt="Meals" />
            <div className="meal-content">
              <h3>{meal.strMeal}</h3>
              

              <Link to={`/mealsDetails/${meal.idMeal}`}>View Recipe</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
