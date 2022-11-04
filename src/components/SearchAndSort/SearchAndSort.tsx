import React, {FC, useState} from 'react';
import css from  './SearchAndSort.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type changeInputType = {
  changeSearch: (child: string) => void
  changeGood: () => void
  changeBad: () => void
}

const SearchAndSort: FC<changeInputType> = ({changeSearch, changeGood, changeBad}) => {
  const [inputSearch, setInputSearch] = useState<string>('')
  
  return (
    <div className={css.containerSearch}>
      <input className={css.searchBar} onChange={(e) => {
        setInputSearch(e.target.value);
        changeSearch(inputSearch)
      }}/>
      <div className={css.containerButton}>
        <button className={css.button} onClick={() => changeGood()}>Top &#8593;</button>
        <button className={css.button} onClick={() => changeBad()}>Flop &#8595;</button>
      </div>
    </div>
  );
};

export default SearchAndSort;