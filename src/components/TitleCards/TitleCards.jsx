import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';



const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzBjYjVjYTZhZWZjYmRkYzViNTQzYmYzZTIzMzBmZSIsIm5iZiI6MTczMTI1Mzc2MS42Mzc3Mjc1LCJzdWIiOiI2NzMwYzU4ZWFjOTcwYWFkMmE4ZDk5NDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5bFUm_nDKCP0d8m8iGqvYgrgTwjW469zYQg5-Rmi6-0'
    }
  };





  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (cardsRef.current) {
        cardsRef.current.scrollLeft += 1;
      }
    }, 20);


    return () => clearInterval(intervalId);
  }, []);



  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  );
};

export default TitleCards
