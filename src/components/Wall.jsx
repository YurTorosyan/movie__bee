import React from 'react'
import requests from '../requests';

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

  return (
    <div className='wall'>
      <div className="wall__container">
        
      </div>
    </div>
  )
}
