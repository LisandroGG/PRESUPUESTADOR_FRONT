import Nav from "@components/Nav/Nav.jsx";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
	const { homeLoading } = useSelector((state) => state.ui);

	return (
		<div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[60px_1fr]">
			{homeLoading && (
				<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-100">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500"></div>
					<span className="text-gray-700 text-xl font-semibold mt-4">
						Cargando sistema...
					</span>
				</div>
			)}

			<aside className="row-span-2">
				<Nav />
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
