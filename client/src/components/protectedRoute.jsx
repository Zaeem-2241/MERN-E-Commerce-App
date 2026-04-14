import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { Login } from "../pages/Login";


function ProtectedRoute({children}) {
  const { userInfo } = useSelector((state)=> state.auth);

  return userInfo ? children : <Navigate to="/login" />
};
export default ProtectedRoute;