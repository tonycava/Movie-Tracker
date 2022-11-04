import React, { FC, useEffect, useState } from 'react';
import css from './Card.module.scss'
import defaultPoster from '/default.jpg'
import PopupOverview from "../PopupOverview/PopupOverview";
import axios from "axios";
import { notifyWhenRemoveFavorite, notifyWhenAddFavorite, alreadyInFavorite } from "../../NotifyModal/ModalNotify";

export interface DataApiMovieCard {
  name?: string;
  needDelete: boolean
  results: {
    overview: string,
    id: number
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
  }
}

const Card: FC<DataApiMovieCard> = ({ results, needDelete }) => {
  const template = "https://image.tmdb.org/t/p/original"
  const [seeSynopsis, setSeeSynopsis] = useState<string>("")
  const [oneMovie, setOneMovie] = useState<DataApiMovieCard[]>([])
  const constSet = () => {
    if (results.overview === "") return setSeeSynopsis("No overview set")
    return setSeeSynopsis(results.overview)
  }
  const DeleteLoc = () => {
    const dataLocal = JSON.parse(localStorage.getItem("MovieFav") || '{}')
    
    let data = dataLocal.filter((search: string) => search === String(results.id))[0]
    dataLocal.splice(dataLocal.indexOf(data), 1);
    localStorage.setItem("MovieFav", JSON.stringify(dataLocal));
    setTimeout(() => {
      window.location.reload()
    }, 2000)
    notifyWhenRemoveFavorite()
  }
  
  const setLoc = () => {
    let MovieFav: string[]
    if (localStorage.getItem("MovieFav") === null) MovieFav = []
    else MovieFav = JSON.parse(localStorage.getItem("MovieFav") || '{}')
    
    const found = MovieFav.includes(String(results.id))
    if (!found) {
      MovieFav.push(String(results.id))
      localStorage.setItem("MovieFav", JSON.stringify(MovieFav))
      notifyWhenAddFavorite()
    }
    alreadyInFavorite()
  }
  
  useEffect(() => {
    let isShow = true
    axios.get(`https://api.themoviedb.org/3/movie/${results.id}?api_key=f9865987eeba9a3c31f1cbb52cb0c0b4`)
      .then((data) => {
        if (isShow) setOneMovie(data.data.genres)
      })
      .catch((err) => console.log(err))
    return () => {
      isShow = false
    }
  }, [results.id]);
  
  const genreFinder: () => JSX.Element[] = () => {
    let genreArray: string[] = []
    oneMovie.forEach((item) => genreArray.push(item.name ?? ""))
    return genreArray.map((item: string, index: number) => <li key={index}>{item}</li>)
  }
  return (
    
    
    <div className={css.cardContent}>
      <div className={css.containerImage}>
        <img className={css.imageMovie} src={results.poster_path ? template + results.poster_path : defaultPoster}
             alt='image movie'/>
      </div>
      <span className={css.movieTitle}>{results.title}</span>
      
      <div className={css.containerMid}>
        <span className={css.spanRate}>{results.vote_average} / 10 🌟</span>
        <span className={css.releaseDate}>{results.release_date}</span>
      </div>
      <span className={css.genre}>Genre :</span>
      
      <ul className={css.containerGenre}>
        {genreFinder().length > 0 ? genreFinder() : <span>No overview set</span>}
      </ul>
      
      <div className={css.containerShowOverview}>
        <button className={css.buttonShowOverview} onClick={() => {
          constSet()
        }}>Voir le synopsis !
        </button>
        
        {seeSynopsis &&
          <PopupOverview
            overview={seeSynopsis}
            onClose={() => setSeeSynopsis('')}
            onSave={() => setLoc()}
            onDelete={() => DeleteLoc()}

            key={results.id}
            movie={results.title}
            needClose={needDelete}
          />}
      </div>
    </div>
  )
}

export default Card;