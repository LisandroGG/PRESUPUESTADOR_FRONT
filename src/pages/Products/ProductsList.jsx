import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import TableList from "@components/Common/TableList.jsx";
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

	const columns = [
		{
			key: "id",
			label: "Identificador",
			width: "w-[5%]",
		},
		{
			key: "name",
			label: "Nombre",
			width: "w-[35%]",
			render: (product) => (
				<Link
					to={`/products/${product.id}`}
					className="hover:text-primary-500 hover:font-semibold"
				>
					{product.name}
				</Link>
			),
		},
		{
			key: "description",
			label: "Descripción",
			width: "w-[55%]",
			render: (product) => (
				<div className="h-12 overflow-y-auto no-scrollbar">
					{product.description}
				</div>
			),
		},
	];

	const renderActions = (product) => (
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
	);

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

			<TableList
				columns={columns}
				data={products}
				renderActions={renderActions}
				emptyMessage="No hay productos registrados"
			/>

			<Pagination
				page={page}
				totalPages={totalPages}
				hasPrev={hasPrev}
				hasNext={hasNext}
				onPageChange={goToPage}
			/>

			{modalState?.type === "create" && (
				<ProductFormModal
					open
					initialData={null}
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
