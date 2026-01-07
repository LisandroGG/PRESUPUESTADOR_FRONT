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
		<header className="bg-primary-500 h-full text-white shadow-md z-50 w-full flex">
			<div className="mx-auto flex flex-col items-center gap-6 justify-center w-full">
				<nav>
					<ul className="flex flex-col gap-6">
						{navItems.map(({ to, label, icon }) => (
							<li key={label}>
								<Link
									to={to}
									className="hover:scale-105 cursor-pointer flex gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-lg font-semibold"
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
					className="hover:scale-105 cursor-pointer flex gap-2 p-2 items-center hover:bg-white/10 rounded-lg transition-all duration-200 text-lg font-semibold"
				>
					<LogOutIcon size={16} />
					Cerrar sesion
				</button>
			</div>
		</header>
	);
};

export default Nav;
