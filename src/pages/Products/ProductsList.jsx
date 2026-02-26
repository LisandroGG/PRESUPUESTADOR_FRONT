import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import SectionList from "@components/Common/SectionList.jsx";
import TableList from "@components/Common/TableList.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
} from "@redux/Slices/productSlice";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductFormModal from "./ProductFormModal.jsx";
import ProductSearchModal from "./ProductSearchModal.jsx";

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
				clearFilters();
			}

			if (modalState.type === "create") {
				await run(createProduct, productData);
				await run(getAllProducts);
				clearFilters();
			}

			if (modalState.type === "search") {
				applyFilters(productData);
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
					title="Ver detalle"
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
	} = usePagination((state) => state.products, getAllProducts);

	const hasActiveFilters = Object.keys(filters || {}).length > 0;

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando productos..."} />
			</div>
		);
	}

	const onAdd = () => {
		setModalState({
			type: "create",
			entity: "product",
			data: null,
		});
	};

	const onSearch = () => {
		setModalState({
			type: "search",
			entity: "product",
			data: null,
		});
	};

	return (
		<SectionList
			list="producto"
			title="Productos"
			onAdd={onAdd}
			onSearch={onSearch}
			onClearSearch={hasActiveFilters ? clearFilters : undefined}
		>
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

			<ProductFormModal
				open={modalState?.type === "create"}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>

			<ConfirmModal
				open={modalState?.type === "delete"}
				title="Eliminar producto"
				description="¿Estás seguro que deseas eliminar este producto?"
				onCancel={handleCancel}
				onConfirm={() => handleConfirm()}
			/>

			<ProductSearchModal
				open={modalState?.type === "search"}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
		</SectionList>
	);
};

export default ProductsList;
