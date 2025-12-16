import Button from "@components/Common/Button.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import usePagination from "@hooks/usePagination.js";
import { getAllClients } from "@redux/Slices/clientSlice";
import { formatCuit } from "@utils/formatCuit.js";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";

const ClientsList = () => {
	const { clients } = useSelector((state) => state.clients);

	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.clients, getAllClients);
	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando clientes..."} />
			</div>
		);
	}
	return (
		<section className="max-w-7xl mx-auto p-4">
			<div className="flex justify-between mb-4">
				<h2 className="text-lg font-semibold">Clientes:</h2>
				<Button variant="primary" className="flex items-center gap-2">
					<UserPlus size={16} />
					Nuevo cliente
				</Button>
			</div>
			<div className="overflow-x-auto min-h-120">
				<table className="min-w-full table-fixed border border-neutral-200">
					<thead className="bg-neutral-50">
						<tr className="text-left border-b border-neutral-200 text-neutral-700 text-sm font-semibold">
							<th className="w-[30%] px-4 p-2">Identificador</th>
							<th className="w-[40%] px-4 p-2">Nombre</th>
							<th className="w-[25%] px-4 p-2">CUIT</th>
							<th className="w-[5%] px-4 p-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{!clients?.length && (
							<tr>
								<td colSpan={4} className="text-center py-10 text-neutral-500">
									No hay clientes registrados
								</td>
							</tr>
						)}
						{clients?.map((client) => (
							<tr
								key={client.id}
								className="border-b border-neutral-200 hover:bg-neutral-50"
							>
								<td className="px-4 py-2 text-neutral-500 text-md">
									{" "}
									{client.id}
								</td>
								<td className="px-4 py-2 text-neutral-500 text-md">
									{" "}
									{client.name?.trim() ? (
										client.name
									) : (
										<span className="italic text-neutral-400">
											No registrado
										</span>
									)}
								</td>
								<td className="px-4 py-2 text-neutral-500 text-md">
									{client.cuit ? (
										formatCuit(client.cuit)
									) : (
										<span className="italic text-neutral-400">
											No registrado
										</span>
									)}
								</td>
								<td className="px-4 py-2 ">
									<div className="flex items-center justify-center gap-2">
										<Button variant="ghost" title="Editar">
											<Pencil size={16} />
										</Button>
										<Button variant="danger" title="Eliminar">
											<Trash2 size={16} />
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Pagination
				page={page}
				totalPages={totalPages}
				hasPrev={hasPrev}
				hasNext={hasNext}
				onPageChange={goToPage}
			/>
		</section>
	);
};

export default ClientsList;
