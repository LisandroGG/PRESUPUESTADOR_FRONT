import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const loading = useSelector((state) => state.user.loading)

	if(loading) {
		return null
	}

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
