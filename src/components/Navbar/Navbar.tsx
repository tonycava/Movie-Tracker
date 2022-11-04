import React from 'react';
import logo from '/logo.svg'
import {NavLink} from "react-router-dom";
import css from "./Navbar.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className={css.containerNav}>
      <div className={css.navContainer}>
        <div className={css.logoContainer}>
          <img src={logo} alt="logo navbar" className={css.logo}/>
        </div>
        <span className={css.slogan}>Movie Tracker</span>
        <div className={css.itemContainer}>
          <ul className={css.itemList}>
            <li className={css.navItem}>
              <div className={css.navBtn}>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/home.png" alt="Home icon"
                     className={css.navIcon}/>
                <NavLink to="/" className={css.navLink}>Home</NavLink>
              </div>
            </li>
            <li className={css.navItem}>
              <div className={css.navBtn}>
                <span><FontAwesomeIcon icon={faHeart} className={css.navIcon}/></span>
                <NavLink to="/about" className={css.navLink}>Coup de coeur</NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;