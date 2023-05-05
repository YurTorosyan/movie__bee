import './App.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Wall from './components/Wall'
import requests from './requests'
import Footer from './components/Footer'


function App() {
  return (
    <>
      <Header />
      <Wall />
      <Movies title={"Trending"} fetchUrl={requests.fetchTrending}/>
      <Movies title={"Top Rated"} fetchUrl={requests.fetchTopRated}/>
      <Movies title={"Action"} fetchUrl={requests.fetchActionMovies}/>
      <Movies title={"Comedy"} fetchUrl={requests.fetchComedyMovies}/>
      <Movies title={"Horror"} fetchUrl={requests.fetchHorrorMovies}/>
      <Movies title={"Romance"} fetchUrl={requests.fetchRomanceMovies}/>
      <Movies title={"Documentaries"} fetchUrl={requests.fetchDocumentaries}/>
      <Footer />
    </>
  )
}

export default App
