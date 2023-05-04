import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Wall from './components/Wall'
import requests from './requests'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 2000)
  }, [])
  
  return (
    <>
      {loading? <Loader /> : ""}
      <Header />
        <Wall />
        <Movies title={"Trending"} fetchUrl={requests.fetchTrending}/>
        <Movies title={"Top Rated"} fetchUrl={requests.fetchTopRated}/>
        <Movies title={"Action"} fetchUrl={requests.fetchActionMovies}/>
        <Movies title={"Comedy"} fetchUrl={requests.fetchComedyMovies}/>
        <Movies title={"Horror"} fetchUrl={requests.fetchHorrorMovies}/>
        <Movies title={"Romance"} fetchUrl={requests.fetchRomanceMovies}/>
        <Movies title={"Documentaries"} fetchUrl={requests.fetchDocumentaries}/>
    </>
  )
}

export default App
