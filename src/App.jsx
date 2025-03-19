import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.scss'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Meals from './Components/Meals/Meals'
import NotFound from './Components/NotFound/NotFound'
import SelectedCategory from './Components/SelectedCategory/SelectedCategory';
import MealsDetails from './Components/MealsDetails/MealsDetails'

function App() {
  
  const routes = createHashRouter([
    {path:"", element: <Layout/> , children: [
      {index: true, element:<Meals/>},
      { path:"/category", element:<SelectedCategory/>},
      { path:"mealsDetails/:mealId", element:<MealsDetails/>},

      {path:"*", element:<NotFound/>}
    ]}
  ])

  return (
    <>
      <RouterProvider router={routes}>

      </RouterProvider>
    </>
  );
}

export default App
