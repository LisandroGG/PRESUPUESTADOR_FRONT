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
		<div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[60px_1fr]">
			<aside className="row-span-2">
			<Nav handleLogout={handleLogout} />
			</aside>
				<header className="bg-primary-500 flex items-center justify-center">
				<Link to="/" className="flex items-center gap-2">
					<img
						src="assets/img/logo.webp"
						alt="Logo"
						className="w-10 h-10 rounded-full"
					/>
					<span className="text-lg font-bold text-white">
						Metalúrgica Vacari
					</span>
				</Link>
				</header>
			<main className="overflow-auto p-6">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
