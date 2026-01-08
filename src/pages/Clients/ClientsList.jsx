import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import {
	createClient,
	deleteClient,
	getAllClients,
	searchClients,
	updateClient,
} from "@redux/Slices/clientSlice";
import { formatCuit } from "@utils/formatCuit.js";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ClientFormModal from "./ClientFormModal.jsx";

const ClientsList = () => {
	const { clients } = useSelector((state) => state.clients);
	const { run } = useCrudDispatch();

	const [modalState, setModalState] = useState(null);

	const handleCancel = () => {
		setModalState(null);
	};

	const handleConfirm = async (clientData) => {
		if (!modalState) return;

		try {
			if (modalState.type === "delete") {
				await run(deleteClient, modalState.data.id);
				await run(getAllClients);
			}

			if (modalState.type === "create") {
				await run(createClient, clientData);
				await run(getAllClients);
			}

			if (modalState.type === "edit") {
				await run(updateClient, {
					clientId: modalState.data.id,
					clientData,
				});
			}

			setModalState(null);
		} catch {}
	};

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
		<section className="bg-white rounded-md shadow-md p-4 min-h-full">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Clientes:</h2>
				<Button
					variant="primary"
					className="flex items-center gap-2"
					onClick={() =>
						setModalState({
							type: "create",
							entity: "client",
							data: null,
						})
					}
				>
					<UserPlus size={16} />
					Nuevo cliente
				</Button>
			</div>
			<div className="overflow-x-auto min-h-full">
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
										<Button
											variant="ghost"
											title="Editar"
											onClick={() =>
												setModalState({
													type: "edit",
													entity: "client",
													data: client,
												})
											}
										>
											<Pencil size={16} />
										</Button>
										<Button
											variant="danger"
											title="Eliminar"
											onClick={() =>
												setModalState({
													type: "delete",
													entity: "client",
													data: client,
												})
											}
										>
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
			{modalState && modalState.type !== "delete" && (
				<ClientFormModal
					open={modalState.type === "create" || modalState.type === "edit"}
					mode={modalState.type}
					initialData={modalState.data}
					onCancel={handleCancel}
					onConfirm={handleConfirm}
				/>
			)}
			<ConfirmModal
				open={modalState?.type === "delete"}
				title="Eliminar cliente"
				description="¿Estás seguro que deseas eliminar este cliente?"
				onCancel={handleCancel}
				onConfirm={() => handleConfirm()}
			/>
		</section>
	);
};

export default ClientsList;
