import React, {useEffect, useState} from 'react';
import axios from "axios";
import css from "./Home.module.scss"
import Card from "../Card/Card";
import SearchAndSort from "../SearchAndSort/SearchAndSort";
import {useDebounce} from "usehooks-ts";

interface DataApiMovieHome {
  vote_average: number,
  overview: string,
  id: number
  poster_path: string,
  release_date: string,
  title: string,
}

const Home = (props: JSX.Element) => {
  const keyWord = props.props
  const [dataMovies, setDataMovies] = useState<DataApiMovieHome[]>([])
  const [choose, setChoose] = useState('good')
  const [value, setValue] = useState<string>(keyWord)
  const debouncedValue = useDebounce<string>(value, 500)
  
  useEffect(() => {
    let isShow = true
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f9865987eeba9a3c31f1cbb52cb0c0b4&query=${debouncedValue}&language=fr-FR`)
      .then((data) => {
        if (isShow) setDataMovies(data.data.results)
      })
      .catch((err) => console.log(err))
    return () => {
      isShow = false
    }
  }, [debouncedValue]);
  
  return (
    <div className={css.containerApp}>
      <SearchAndSort
        changeSearch={(e) => {
          if (e === '') setValue('end')
          else setValue(e)
        }}
        changeGood={() => setChoose('good')}
        changeBad={() => setChoose('bad')}
      />
      
      <div className={css.containerCard}>
        {dataMovies
          .sort((a, b) => {
            if (choose === "bad") return a.vote_average - b.vote_average
            return b.vote_average - a.vote_average
          })
          .map((item, index) => (
            <Card
              results={item}
              needDelete={false}
              key={index}/>
          ))}
      </div>
    </div>
  );
};

export default Home;