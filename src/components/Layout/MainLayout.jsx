import Nav from "@components/Nav/Nav.jsx";
import { clearError, logoutUser } from "@redux/Slices/usersSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	const dispatch = useDispatch();
	const handleLogout = async () => {
		try {
			await dispatch(logoutUser()).unwrap();

			toast.success("Sesión cerrada correctamente");
			dispatch(clearError());
		} catch (error) {
			toast.error(error || "No se pudo cerrar la sesión");
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Nav handleLogout={handleLogout} />
			<main className="mt-18">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
