import useCrudDispatch from "@hooks/useCrudDispatch.js";
import { getRecentBudgets } from "@redux/Slices/budgetSlice";
import {
	Calendar,
	ClipboardCheck,
	ClipboardClock,
	Eye,
	Package,
	Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
	const [ids, setIds] = useState([]);
	const { run } = useCrudDispatch();
	const { budgets, loading } = useSelector((state) => state.budgets);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem("recentBudgets")) || [];

		if (stored.length > 0) {
			setIds(stored);
		}
	}, []);

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		if (ids.length > 0) {
			run(getRecentBudgets, ids);
		}
	}, [ids]);

	const orderedBudgets = [...budgets].sort(
		(a, b) => ids.indexOf(a.id) - ids.indexOf(b.id),
	);

	const today = new Date();

	const formattedDate = today.toLocaleDateString("es-AR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const statusMap = {
		pending: {
			label: "Pendiente",
			className: "bg-yellow-100 text-yellow-800",
		},
		approved: {
			label: "Confirmado",
			className: "bg-sky-100 text-sky-800",
		},
		paid: {
			label: "Saldado",
			className: "bg-green-100 text-green-800",
		},
	};

	const formatCurrency = (amount) =>
		new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
		}).format(amount);

	return (
		<section className="bg-white rounded-xl border border-neutral-200 shadow-md p-6 min-h-full">
			<div className="flex justify-between mb-6 xl:mb-16">
				<div>
					<h1 className="text-3xl font-semibold">Panel de control</h1>
					<p className="text-neutral-600 text-md">
						Bienvenido al sistema de gestión de Metalúrgica Vacari
					</p>
				</div>
				<div>
					<p className="border border-neutral-300 rounded-md px-3 py-2 bg-neutral-200 text-neutral-500 font-semibold flex gap-2">
						<Calendar size={22} />
						{formattedDate}
					</p>
				</div>
			</div>
			<div className="grid grid-cols-4 gap-4 mb-14">
				<div className="border-neutral-300 border rounded-md flex items-center py-8 justify-center gap-2 shadow-sm">
					<div className="bg-primary-50 text-primary-500 p-2 rounded-full">
						<Users size={36} className="p-1" />
					</div>
					<div className="flex flex-col">
						<span>Clientes</span>
						<span className="text-xl font-semibold">55</span>
					</div>
				</div>
				<div className="border-neutral-300 border rounded-md flex items-center py-4 justify-center gap-2 shadow-sm">
					<div className="bg-primary-50 text-primary-500 p-2 rounded-full">
						<Package size={36} className="p-1" />
					</div>
					<div className="flex flex-col">
						<span>Productos</span>
						<span className="text-xl font-semibold">4</span>
					</div>
				</div>
				<div className="border-neutral-300 border rounded-md flex items-center py-4 justify-center gap-2 shadow-sm">
					<div className="bg-yellow-100 text-yellow-500 p-2 rounded-full">
						<ClipboardClock size={36} className="p-1" />
					</div>
					<div className="flex flex-col">
						<span>Pendientes</span>
						<span className="text-xl font-semibold">3</span>
					</div>
				</div>
				<div className="border-neutral-300 border rounded-md flex items-center py-4 justify-center gap-2 shadow-sm">
					<div className="bg-green-100 text-green-500 p-2 rounded-full">
						<ClipboardCheck size={36} className="p-1" />
					</div>
					<div className="flex flex-col">
						<span>Confirmados</span>
						<span className="text-xl font-semibold">2</span>
					</div>
				</div>
			</div>
			<div className="mt-8 border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
				<div className="flex justify-between items-center px-6 py-4">
					<h2 className="text-2xl font-semibold">Actividad Reciente</h2>
				</div>

				<table className="w-full text-sm">
					<thead className="bg-neutral-100 text-neutral-600 uppercase text-xs">
						<tr>
							<th className="text-left px-6 py-3">Cliente</th>
							<th className="text-left px-6 py-3">Presupuesto</th>
							<th className="text-left px-6 py-3">Monto</th>
							<th className="text-left px-6 py-3">Estado</th>
							<th className="text-left px-6 py-3 w-20">Ver</th>
						</tr>
					</thead>

					<tbody>
						{loading && (
							<tr>
								<td colSpan="5" className="text-center py-6 text-neutral-500">
									Cargando...
								</td>
							</tr>
						)}
						{orderedBudgets?.length === 0 && (
							<tr>
								<td colSpan="5" className="text-center py-6 text-neutral-500">
									No hay actividad reciente
								</td>
							</tr>
						)}
						{orderedBudgets?.map((budget) => {
							const statusData = statusMap[budget.status] || {
								label: budget.status,
								className: "bg-gray-100 text-gray-700",
							};

							return (
								<tr
									key={budget.id}
									className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 transition"
								>
									<td className="px-6 py-4 font-medium">
										{budget.client?.name}
									</td>

									<td className="px-6 py-4 font-medium">{budget.id}</td>

									<td className="px-6 py-4 font-medium">
										{budget?.totalAmount ? (
											formatCurrency(budget.totalAmount)
										) : (
											<span className="italic text-neutral-500">
												Sin confirmar
											</span>
										)}
									</td>

									<td className="px-6 py-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${statusData.className}`}
										>
											{statusData.label}
										</span>
									</td>

									<td className="px-6 py-4 text-neutral-400 hover:text-neutral-500">
										<Link to={`/budgets/${budget.id}`}>
											<Eye size={20} />
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default Home;
