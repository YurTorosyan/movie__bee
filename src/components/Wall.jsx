import React, {useState, useEffect} from 'react'
import axios from "../axios"
import requests from '../requests';
import "./Wall.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek, faEarthAmericas, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
const base_url = 'https://image.tmdb.org/t/p/original';

export default function () {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[Math.floor(Math.random() * request.data.results.length)]
      )
    }

    fetchData()
  }, []);

  function trancate(str, n) {
    return str?.length > n ? str.slice(0, n - 1) + "..." : str;
  }
  console.log(movie)
  return (
    <div className='wall' style={{
      backgroundSize: "cover",
      backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
      backgroundPosition: "center"
    }}>
      <div className="wall__container">
        <div className="wall__wrap">
          <h1>{movie?.original_name}</h1>
          <div className="wall__info">
            <p><FontAwesomeIcon icon={faStarHalfStroke} /> {movie?.vote_average}</p>
            <p><FontAwesomeIcon icon={faCalendarWeek} /> {movie?.first_air_date}</p>
            <p> <FontAwesomeIcon icon={faEarthAmericas} /> {movie?.origin_country}</p>
          </div>
          <p>{trancate(movie?.overview, 200)}</p>
        </div>
      </div>
    </div>
  )
}
