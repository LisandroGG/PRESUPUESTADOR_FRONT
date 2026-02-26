import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import SectionList from "@components/Common/SectionList.jsx";
import TableList from "@components/Common/TableList.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import {
	createClient,
	deleteClient,
	getAllClients,
	updateClient,
} from "@redux/Slices/clientSlice";
import { formatCuit } from "@utils/formatCuit.js";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ClientFormModal from "./ClientFormModal.jsx";
import ClientSearchModal from "./ClientSearchModal.jsx";

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
				clearFilters()
			}

			if (modalState.type === "edit") {
				await run(updateClient, {
					clientId: modalState.data.id,
					clientData,
				});
				clearFilters()
			}

			if (modalState.type === "search") {
			applyFilters(clientData);
			}

			setModalState(null);
		} catch {}
	};

	const columns = [
		{
			key: "id",
			label: "Identificador",
			width: "w-[30%]",
		},
		{
			key: "name",
			label: "Nombre",
			width: "w-[40%]",
			render: (client) =>
				client.name?.trim() ? (
					client.name
				) : (
					<span className="italic text-neutral-400">No registrado</span>
				),
		},
		{
			key: "cuit",
			label: "CUIT",
			width: "w-[25%]",
			render: (client) =>
				client.cuit ? (
					formatCuit(client.cuit)
				) : (
					<span className="italic text-neutral-400">No registrado</span>
				),
		},
	];

	const renderActions = (client) => (
		<>
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
		</>
	);

	const { page, totalPages, hasNext, hasPrev, loading, goToPage, applyFilters, clearFilters, filters } =
		usePagination((state) => state.clients, getAllClients);

	const hasActiveFilters = Object.keys(filters || {}).length > 0;

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando clientes..."} />
			</div>
		);
	}

	const onAdd = () => {
		setModalState({
			type: "create",
			entity: "client",
			data: null,
		});
	};

	const onSearch = () => {
		setModalState({
			type: "search",
			entity: "client",
			data: null,
		});
	};

	return (
		<SectionList
			list="cliente"
			title="Clientes"
			onAdd={onAdd}
			onSearch={onSearch}
			onClearSearch={hasActiveFilters ? clearFilters : undefined}
		>
			<TableList
				columns={columns}
				data={clients}
				renderActions={renderActions}
				emptyMessage="No hay clientes registrados"
			/>
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
				onConfirm={handleConfirm}
			/>
			<ClientSearchModal
				open={modalState?.type === "search"}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
/>
		</SectionList>
	);
};

export default ClientsList;
