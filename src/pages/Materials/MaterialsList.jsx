import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import {
	createMaterial,
	deleteMaterial,
	getAllMaterials,
	updateMaterial,
} from "@redux/Slices/materialSlice";
import { Pencil, SquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const MaterialsList = () => {
	const { materials } = useSelector((state) => state.materials);
	const { run } = useCrudDispatch();

	const [materialToDelete, setMaterialToDelete] = useState(null);
	const [deleting, setDeleting] = useState(false);

	const handleConfirmDelete = async () => {
		if (!materialToDelete) return;

		setDeleting(true);
		try {
			await run(deleteMaterial, materialToDelete.id);
			setMaterialToDelete(null);
		} finally {
			setDeleting(false);
		}
	};

	const handleCancelDelete = () => {
		if (deleting) return;
		setMaterialToDelete(null);
	};

	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.materials, getAllMaterials);

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando materiales..."} />
			</div>
		);
	}
	return (
		<section className="max-w-7xl mx-auto">
			<div className="flex justify-between my-6 items-center">
				<h2 className="text-lg font-semibold">Materiales:</h2>
				<Button variant="primary" className="flex items-center gap-2">
					<SquarePlus size={16} />
					Nuevo material
				</Button>
			</div>
			<div className="overflow-x-hidden min-h-156">
				<table className="min-w-full table-fixed border border-neutral-200">
					<thead className="bg-neutral-50">
						<tr className="text-left border-b border-neutral-200 text-neutral-700 text-sm font-semibold">
							<th className="w-[15%] px-4 p-2">Identificador</th>
							<th className="w-[30%] px-4 py-2">Nombre</th>
							<th className="w-[20%] px-4 py-2">Proveedor</th>
							<th className="w-[15%] px-4 py-2">Costo</th>
							<th className="w-[5%] px-4 py-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{!materials?.length && (
							<tr>
								<td colSpan={4} className="text-center py-10 text-neutral-500">
									No hay materiales registrados
								</td>
							</tr>
						)}
						{materials?.map((material) => (
							<tr
								key={material.id}
								className="border-b border-neutral-200 hover:bg-neutral-50"
							>
								<td className="px-4 py-2 text-neutral-500 text-md">
									{" "}
									{material.id}
								</td>
								<td className="px-4 py-2 text-neutral-500 text-md">
									{" "}
									{material.name}
								</td>
								<td className="px-4 py-2 text-neutral-500 text-md">
									{material.provider}
								</td>
								<td className="px-4 py-2 text-neutral-500 text-md">
									{material.cost}
								</td>
								<td className="px-4 py-2 ">
									<div className="flex items-center justify-center gap-2">
										<Button variant="ghost" title="Editar">
											<Pencil size={16} />
										</Button>
										<Button
											variant="danger"
											title="Eliminar"
											onClick={() => setMaterialToDelete(material)}
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
			{materialToDelete && (
				<ConfirmModal
					title="Eliminar material"
					description={
						<>
							¿Estás seguro que deseas eliminar el material{" "}
							<strong>
								{materialToDelete.name?.trim()
									? materialToDelete.name
									: "No registrado"}
							</strong>
							?
						</>
					}
					confirmText="Eliminar"
					cancelText="Cancelar"
					loading={deleting}
					onConfirm={handleConfirmDelete}
					onCancel={handleCancelDelete}
				/>
			)}
		</section>
	);
};

export default MaterialsList;
