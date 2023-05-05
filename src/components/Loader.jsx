import React from 'react'
import loader from "../assets/loader.svg"
import logo from "../assets/logo.webp"
import "./Loader.scss"

export default function Loader() {
  return (
    <div className='loader' id='spinner'>
      <span class="spinner"><img src={logo} alt="" /></span>
    </div>
  )
}
