import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({children}) {
    const { userInfo } = useSelector((state) => state.auth)
    return  userInfo && userInfo.isAdmin ? children : <Navigate to="/" />
    ;
}

export default AdminRoute;