import React, {FC} from 'react';
import css from './PopupOverview.module.scss'
import {faClose, faHeart, faHeartCrack} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ToastContainer} from "react-toastify";

type TextContent = {
  movie: string
  overview: string
  needClose: boolean
  onClose: () => void
  onSave: () => void
  onDelete: () => void
}

const PopupOverview: FC<TextContent> = ({overview, onClose, onSave, needClose, onDelete, movie}) => {
  return <div className={css.containerAll}>
    <ToastContainer limit={1}/>
    <div className={css.containerPopup}>
      <span className={css.overviewTittle}>Overview of the movie  "{movie}" :</span>
      <div className={css.overviewText}><p>{overview}</p></div>
      <div className={css.containerButton}>
        <button className={css.overviewButton} onClick={() => onClose()}>
          <FontAwesomeIcon icon={faClose} className={css.cross}/></button>
        {needClose ?
            <button className={css.overviewButton} onClick={() => onDelete()
            }><FontAwesomeIcon icon={faHeartCrack} className={css.cross}/></button>
          :
          <button className={css.overviewButton} onClick={() => onSave()
            }><FontAwesomeIcon icon={faHeart} className={css.cross}/></button>}
      </div>
    </div>
  </div>
};

export default PopupOverview;



