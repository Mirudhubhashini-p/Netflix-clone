import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const[apiData, setApiData]=useState({

    name:"",
    key:"",
    published_at: "",
    typeof:""
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzBjYjVjYTZhZWZjYmRkYzViNTQzYmYzZTIzMzBmZSIsIm5iZiI6MTczMTI1Mzc2MS42Mzc3Mjc1LCJzdWIiOiI2NzMwYzU4ZWFjOTcwYWFkMmE4ZDk5NDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5bFUm_nDKCP0d8m8iGqvYgrgTwjW469zYQg5-Rmi6-0'
    }
  };
  

  useEffect (()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])

  const navigate =useNavigate();
   
  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
      
    </div>
  )
}

export default Player
