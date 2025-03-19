import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Layout.scss'
import logoImg from '../../assets/Images/logo.png'


export default function Layout() {
  
  return (
    <div className="layout-content">
      <aside className="sideBar">
        <img src={logoImg} className="logo" alt="logoImage" />
        <div className="links">
          <Link className="meals" to={""}>
            <i class="fa-solid fa-utensils"></i> Meals
          </Link>
        </div>
      </aside>

      <button className="menu-btn"> |||</button>

      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
