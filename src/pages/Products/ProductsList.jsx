import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	searchProducts,
} from "@redux/Slices/productSlice";
import { SquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductFormModal from "./ProductFormModal.jsx";

const ProductsList = () => {
	const { products } = useSelector((state) => state.products);
	const { run } = useCrudDispatch();

	const [modalState, setModalState] = useState(null);

	const handleCancel = () => {
		setModalState(null);
	};

	const handleConfirm = async (productData) => {
		if (!modalState) return;
		try {
			if (modalState.type === "delete") {
				await run(deleteProduct, modalState.data.id);
				await run(getAllProducts);
			}

			if (modalState.type === "create") {
				await run(createProduct, productData);
				await run(getAllProducts);
			}

			setModalState(null);
		} catch {}
	};

	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.products, getAllProducts);

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando productos..."} />
			</div>
		);
	}

	return (
		<section className="bg-white rounded-xl border border-neutral-200 shadow-md p-6 min-h-full">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Productos:</h2>
				<Button
					variant="primary"
					className="flex items-center gap-2"
					onClick={() =>
						setModalState({
							type: "create",
							entity: "product",
							data: null,
						})
					}
				>
					<SquarePlus size={16} />
					Nuevo producto
				</Button>
			</div>
			<div className="overflow-x-hidden h-158 overflow-y-auto">
				<table className="min-w-full table-fixed border border-neutral-200">
					<thead className="bg-neutral-100">
						<tr className="text-left border-b border-neutral-200 text-neutral-700 text-sm font-semibold">
							<th className="w-[5%] px-4 p-2">Identificador</th>
							<th className="w-[35%] px-4 py-2">Nombre</th>
							<th className="w-[55%] px-4 py-2">Descripción</th>
							<th className="w-[5%] px-4 py-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{!products?.length && (
							<tr>
								<td colSpan={4} className="text-center py-4 text-neutral-500">
									No hay productos registrados
								</td>
							</tr>
						)}
						{products?.map((product) => (
							<tr
								className="border-b border-neutral-200 hover:bg-neutral-50"
								key={product.id}
							>
								<td className="px-4 py-2 text-neutral-500 text-md">
									{" "}
									{product.id}
								</td>
								<td className="px-4 py-2 text-neutral-500 text-md">
									<Link
										to={`/products/${product.id}`}
										className="hover:text-primary-500 hover:font-semibold"
									>
										{product.name}
									</Link>
								</td>
								<td className="px-4 py-2 text-neutral-500 text-md">
									<div className="h-12 overflow-y-auto no-scrollbar">
									{product.description}
									</div>
								</td>
								<td className="px-4 py-2 ">
									<div className="flex items-center justify-center gap-2">
										<Button
											variant="danger"
											title="Eliminar"
											onClick={() =>
												setModalState({
													type: "delete",
													entity: "product",
													data: product,
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
				<ProductFormModal
					open={modalState.type === "create"}
					initialData={modalState.data}
					onCancel={handleCancel}
					onConfirm={handleConfirm}
				/>
			)}
			<ConfirmModal
				open={modalState?.type === "delete"}
				title="Eliminar producto"
				description="¿Estás seguro que deseas eliminar este producto?"
				onCancel={handleCancel}
				onConfirm={() => handleConfirm()}
			/>
		</section>
	);
};

export default ProductsList;
