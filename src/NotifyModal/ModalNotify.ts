import {toast} from "react-toastify";

export const notifyWhenAddFavorite = () => toast.success('Movie successfully add in favorite', {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  toastId: 'fav',
});
export const alreadyInFavorite = () => toast.success('Movie already in favorite', {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  toastId: 'fav',
});
export const notifyWhenRemoveFavorite = () => toast.success('Successfully remove from Favorite', {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  toastId: 'removeFav',
});