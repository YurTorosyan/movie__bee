import React, { useEffect, useState } from 'react'
import "./Movies.scss"
import axios from "../axios";
import Slider from "react-slick"
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader'

const base_url = 'https://image.tmdb.org/t/p/w500/';

export default function Movies({ title, fetchUrl }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")
  const [timeToPlay, setTimeToPlay] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results)
      setTimeout(() => { setLoading(false) }, 2000)
      
    }
    fetchData()
  }, [fetchUrl])

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie.name || movie.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'));
        })
        .catch(err => console.log(err))
    }
  }

  const opts = {
    height: '600',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };



  const settings = {
    infinite: true,
    slidesToShow: 7,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1275,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 945,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };
  
  return (
    <>
    {loading ? <Loader/> : ""}
    <div className='movies'>
      <div className="movies__container">
        <div>
          <h2>{title}</h2>
          <Slider {...settings}>
            {
              movies.map(elem => {
                return (
                  <div 
                      className='movies__item'
                      key={elem.id} 
                      onClick={(e) => {
                        handleClick(elem)
                        setTimeToPlay(true)
                      }}>
                    <img src={`${base_url}${elem.poster_path}`} alt={elem} />
                    <p><FontAwesomeIcon icon={faStarHalfStroke} /> {elem.vote_average}</p>
                  </div>
                )
              })
            }
          </Slider>
          {(trailerUrl && timeToPlay) && <div className='movies__player'>
            <span onClick={() => {
              setTimeToPlay(false)
            }}><FontAwesomeIcon icon={faCircleXmark} /></span>
            <YouTube
              videoId={trailerUrl}
              onEnd={() => setTimeToPlay(false)}
              opts={opts}
              className='movies__youtube-player' />
          </div>}
        </div>
      </div>
    </div>
    </>
  )
}
