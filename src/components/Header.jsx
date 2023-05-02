import React from 'react'
import "./Header.scss"
import logo from "../assets/logo.webp"

export default function Header() {
  return (
    <div className='header'>
        <div className="header__container">
          <div className="header__logo">
            <img src={logo} alt="Logo" />
            <h1>Movie Bee</h1>
          </div>
        </div>
    </div>
  )
}
