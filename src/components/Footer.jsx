import React from 'react'
import "./Footer.scss"
import logo from "../assets/logo.webp"

export default function Footer() {
  return (
    <div className='footer'>
      <div className="footer__container">
        <div className="footer__wrap">
          <div className="footer__logo">
            <img src={logo} alt="Logo" />
            <h1>Movie Bee</h1>
          </div>
          <p>This Page created by <a href="https://github.com/YurTorosyan" target="_blank">Yuri Torosyan</a> with the help of React</p>
          <p>Movie Bee Github <a href="https://github.com/YurTorosyan/movie__bee" target="_blank">Source page</a></p>
        </div>
        <p className="footer__copyright">&copy; Copyright 2023</p>
      </div>
    </div>
  )
}
