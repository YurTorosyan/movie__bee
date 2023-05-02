import React, { useEffect, useState } from 'react'
import "./Header.scss"
import logo from "../assets/logo.webp"

export default function Header() {
  const [show, setShow] = useState(false)

  const scrollDetect = () => {
    if(window.scrollY > 80) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollDetect)
    return () => window.removeEventListener("scroll", scrollDetect)
  }, [])
  
  return (
    <div className={`header ${show && "header__shown"}`}>
        <div className="header__container">
          <div className="header__logo">
            <img src={logo} alt="Logo" />
            <h1>Movie Bee</h1>
          </div>
        </div>
    </div>
  )
}
