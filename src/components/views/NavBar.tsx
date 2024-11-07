import React from 'react'
import {NavLink} from "react-router-dom"
import './NavBar.css'
import {ROUTES} from "../../Routes.tsx";

export const NavBar: React.FC = () => {
  return (
    <nav className='nav'>
      <div className='nav__wrapper'>
        <div className='nav__links'>
          <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
          <NavLink to={ROUTES.SPACEOBJECTS} className='nav__link'>Космические объекты</NavLink>
        </div>
        {/*<div className='nav__cart'>*/}
        {/*  <NavLink to={ROUTES.HOME} className='nav__link nav__link--card'>АМС</NavLink>*/}
        {/*</div>*/}
        <div className='nav__mobile-wrapper'
             onClick={(event) => event.currentTarget.classList.toggle('active')}
        >
          <div className='nav__mobile-target'/>
          <div className='nav__mobile-menu'>
            <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
            <NavLink to={ROUTES.SPACEOBJECTS} className='nav__link'>Космические объекты</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}