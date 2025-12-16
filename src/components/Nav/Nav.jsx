import { Boxes, FileText, LogOutIcon, Package, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Nav = ({ handleLogout }) => {
	const navItems = [
		{
			to: "/clients",
			label: "Clientes",
			icon: <Users size={16} />,
		},
		{
			to: "/materials",
			label: "Materiales",
			icon: <Boxes size={16} />,
		},
		{
			to: "/products",
			label: "Productos",
			icon: <Package size={16} />,
		},
		{
			to: "/budgets",
			label: "Presupuestos",
			icon: <FileText size={16} />,
		},
	];
	return (
		<header className="bg-primary-500 text-white shadow-md w-full z-50 fixed top-0 left-0 right-0">
			<div className="max-w-7xl mx-auto flex items-center justify-between p-4">
				<Link to="/" className="flex items-center gap-2">
					<img
						src="assets/img/logo.webp"
						alt="Logo"
						className="rounded-full w-10 h-10"
					/>
					<span className="text-lg font-bold">Metalurgica vacari</span>
				</Link>
				<nav className="flex items-center">
					<ul className="flex gap-6 items-center">
						{navItems.map(({ to, label, icon }) => (
							<li key={label}>
								<Link
									to={to}
									className="hover:scale-105 cursor-pointer flex gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-md font-semibold"
								>
									{icon}
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<button
					type="button"
					onClick={() => handleLogout()}
					className="hover:scale-105 cursor-pointer flex gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-md font-semibold"
				>
					<LogOutIcon size={16} />
					Cerrar sesion
				</button>
			</div>
		</header>
	);
};

export default Nav;
