import React, {useEffect, useState} from 'react';
import axios from "axios";
import Card from "../Card/Card";
import css from "./About.module.scss"
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface DataApiMovieAbout {
  name?: string,
  overview: string,
  id: number
  poster_path: string,
  release_date: string,
  title: string,
  vote_average: number,
  needDelete: boolean
}

const About = () => {
  const [movie, setMovie] = useState<DataApiMovieAbout[]>([])
  const movieInLocal = JSON.parse(localStorage.getItem('MovieFav') || "[]")
  
  useEffect(() => {
    movieInLocal?.forEach((movie: string) => {
      axios.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=f9865987eeba9a3c31f1cbb52cb0c0b4&language=fr-FR`)
        .then((res) => setMovie((movie) => [...movie, res.data]))
        .catch((err) => console.log(err))
    })
  }, [])
  
  return (
    <div className={css.containerAll}>
      {movie.length > 0 ?
        movie.map((item: DataApiMovieAbout, index: number) => (
          <Card
            results={item}
            key={index}
            needDelete={true}
          />
        )) : (<span>Rien pour le moment &nbsp; <FontAwesomeIcon icon={faHeart}/></span>)}
    </div>
  );
};

export default About;