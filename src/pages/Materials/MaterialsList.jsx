import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import SectionList from "@components/Common/SectionList.jsx";
import TableList from "@components/Common/TableList.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import {
	createMaterial,
	deleteMaterial,
	getAllMaterials,
	updateMaterial,
} from "@redux/Slices/materialSlice";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import MaterialFormModal from "./MaterialFormModal.jsx";
import MaterialSearchModal from "./MaterialSearchModal.jsx";

const MaterialsList = () => {
	const { materials } = useSelector((state) => state.materials);
	const { run } = useCrudDispatch();

	const [modalState, setModalState] = useState(null);

	const handleCancel = () => {
		setModalState(null);
	};

	const handleConfirm = async (materialData) => {
		if (!modalState) return;

		try {
			if (modalState.type === "delete") {
				await run(deleteMaterial, modalState.data.id);
				await run(getAllMaterials);
				clearFilters();
			}

			if (modalState.type === "create") {
				await run(createMaterial, materialData);
				await run(getAllMaterials);
				clearFilters();
			}

			if (modalState.type === "edit") {
				await run(updateMaterial, {
					materialId: modalState.data.id,
					materialData,
				});
				clearFilters();
			}

			if (modalState.type === "search") {
				applyFilters(materialData);
			}

			setModalState(null);
		} catch {}
	};

	const columns = [
		{
			key: "id",
			label: "Identificador",
			width: "w-[10%]",
		},
		{
			key: "name",
			label: "Nombre",
			width: "w-[20%]",
		},
		{
			key: "provider",
			label: "Proveedor",
			width: "w-[20%]",
		},
		{
			key: "cost",
			label: "Costo",
			width: "w-[15%]",
			render: (material) => `$${Number(material.cost).toFixed(2)}`,
		}
	];

	const renderActions = (material) => (
		<>
			<Button
				variant="ghost"
				title="Editar"
				onClick={() =>
					setModalState({
						type: "edit",
						entity: "material",
						data: material,
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
						entity: "material",
						data: material,
					})
				}
			>
				<Trash2 size={16} />
			</Button>
		</>
	);

	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
		clearFilters,
		filters,
	} = usePagination((state) => state.materials, getAllMaterials);

	const hasActiveFilters = Object.keys(filters || {}).length > 0;

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando materiales..."} />
			</div>
		);
	}

	const onAdd = () => {
		setModalState({
			type: "create",
			entity: "material",
			data: null,
		});
	};

	const onSearch = () => {
		setModalState({
			type: "search",
			entity: "material",
			data: null,
		});
	};
	return (
		<SectionList
			list="material"
			title="Materiales"
			onAdd={onAdd}
			onSearch={onSearch}
			onClearSearch={hasActiveFilters ? clearFilters : undefined}
		>
			<TableList
				columns={columns}
				data={materials}
				renderActions={renderActions}
				emptyMessage="No hay materiales registrados"
			/>
			<Pagination
				page={page}
				totalPages={totalPages}
				hasPrev={hasPrev}
				hasNext={hasNext}
				onPageChange={goToPage}
			/>
			{modalState && modalState.type !== "delete" && (
				<MaterialFormModal
					open={modalState.type === "create" || modalState.type === "edit"}
					mode={modalState.type}
					initialData={modalState.data}
					onCancel={handleCancel}
					onConfirm={handleConfirm}
				/>
			)}
			<ConfirmModal
				open={modalState?.type === "delete"}
				title="Eliminar material"
				description="¿Estás seguro que deseas eliminar este material?"
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
			<MaterialSearchModal
				open={modalState?.type === "search"}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
		</SectionList>
	);
};

export default MaterialsList;
