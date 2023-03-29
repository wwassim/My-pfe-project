import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtist } from "../redux/artistSlice";
import { useParams } from "react-router-dom";
const useArtistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {  artist } = useSelector((state) => state.artists);
   
  useEffect(() => {
    dispatch(fetchArtist(id));

  }, [dispatch, id]);
  // console.log(category);
  return {  artist };
};

export default useArtistDetails;