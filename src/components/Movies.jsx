import React, { useEffect, useState } from 'react'
import "./Movies.scss"
import axios from "../axios";
import Slider from "react-slick"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

const base_url = 'https://image.tmdb.org/t/p/w500/';

export default function Movies({ title, fetchUrl }) {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results)
    }
    fetchData()
  }, [fetchUrl])

  const settings = {
    infinite: true,
    slidesToShow: 7,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className='movies'>
      <div className="movies__container">
        <div>
          <h2>{title}</h2>
          <Slider {...settings}>
            {
              movies.map(elem => {
                return (
                  <div className='movies__item' key={elem.id}>
                    <img src={`${base_url}${elem.poster_path}`} alt={elem} />
                    <p><FontAwesomeIcon icon={faStarHalfStroke} /> {elem.vote_average}</p>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}
