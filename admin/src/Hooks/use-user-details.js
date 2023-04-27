import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/userSlice";
import { useParams } from "react-router-dom";
const useUserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {  user } = useSelector((state) => state.users);
   
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);
  console.log(user)
  return {  user };
};

export default useUserDetails;