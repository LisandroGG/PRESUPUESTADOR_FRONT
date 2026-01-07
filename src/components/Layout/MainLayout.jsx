import Nav from "@components/Nav/Nav.jsx";
import { clearError, logoutUser } from "@redux/Slices/usersSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";

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
		<div className="min-h-screen grid grid-cols-6 grid-rows-2 bg-neutral-100">
			<div className="col-span-1 row-span-2">
			<Nav handleLogout={handleLogout} />
			</div>
			<main className="col-span-5 row-span-2">
				<div className="bg-primary-500 h-22 flex items-center justify-center">
				<Link to="/" className="flex items-center gap-2">
					<img
						src="assets/img/logo.webp"
						alt="Logo"
						className="rounded-full w-15 h-15"
					/>
					<span className="text-lg font-bold text-white">Metalurgica vacari</span>
				</Link>
				</div>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
