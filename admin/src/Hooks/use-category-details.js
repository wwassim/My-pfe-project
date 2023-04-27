import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../redux/categorySlice";
import { useParams } from "react-router-dom";
const useCategoryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading,error,category } = useSelector((state) => state.categorys);

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);
  return {  loading,error, category };
};

export default useCategoryDetails;