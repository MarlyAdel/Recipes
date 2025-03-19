import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./MealsDetails.scss"


export default function MealsDetails() {

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { mealId } = useParams();

  async function getMealsDetails(id){
    setLoading(true);
    try {
        let {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        //console.log(data);
        if (!data.meals) throw new Error("There is no meals");
        setDetails(data.meals[0])
    } 
    catch (error) {
        console.log(error);
        setError(error.message);
    }
    finally{
        setLoading(false)
    }
  }

  useEffect(() => {
    getMealsDetails(mealId);
  }, [mealId]);


  return (
    <div className="container-meals">
      <div className="meal-details">
        {loading ? (
          <p>Loading meal details...</p>
        ) : error ? (
          <p>{error}</p>
        ) : details ? (
          <>
            <h1>{details.strMeal}</h1>
            <div className="meals-content">
              <img src={details.strMealThumb} alt={details.strMeal} />
               
              <p> {details.strInstructions}</p>

              <div className="table">
                <h3>Ingredients</h3>
                <div className="ingredients-table">
                  <span>{details.strIngredient1}: </span>
                  <span>{details.strMeasure1}</span>
                </div>
                <div className="ingredients-table">
                  <span>{details.strIngredient2}: </span>
                  <span>{details.strMeasure2}</span>
                </div>
                <div className="ingredients-table">
                  <span>{details.strIngredient3}: </span>
                  <span>{details.strMeasure3}</span>
                </div>
                <div className="ingredients-table">
                  <span>{details.strIngredient4}: </span>
                  <span>{details.strMeasure4}</span>
                </div>
                <div className="ingredients-table">
                  <span>{details.strIngredient5}: </span>
                  <span>{details.strMeasure5}</span>
                </div>
                <div className="ingredients-table">
                  <span>{details.strIngredient6}: </span>
                  <span>{details.strMeasure6}</span>
                </div>
                <div className="ingreds">
                  <span>{details.strIngredient7}: </span>
                  <span>{details.strMeasure7}</span>
                </div>
                <div className="social-media">
              <Link className='youtube' to={details.strYoutube} target="_blank"><i class="fa-brands fa-youtube"></i> youtube</Link>
              {details.strSource != null && (
                <Link className='source' to={details.strSource} target="_blank"><i class="fa-solid fa-earth-americas"></i> source</Link>
              )}
            </div>
              </div>
              
            </div>
          </>
        ) : (
          <p>No meal details available.</p>
        )}
      </div>
    </div>
  );
}
  
