import Button from "@components/Common/Button.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import SectionList from "@components/Common/SectionList.jsx";
import TableList from "@components/Common/TableList.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import { getAllChecks, updateCheckDetail } from "@redux/Slices/paymentSlice";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CheckSearchModal from "./CheckSearchModal.jsx";
import CheckUpdateModal from "./CheckUpdateModal.jsx";

const ChecksList = () => {
	const { checks } = useSelector((state) => state.payments);
	const { run } = useCrudDispatch();

	const [modalState, setModalState] = useState(null);

	const handleCancel = () => {
		setModalState(null);
	};

	const handleConfirm = async (checkData) => {
		if (!modalState) return;

		try {
			if (modalState.type === "update") {
				console.log();
				await run(updateCheckDetail, {
					paymentId: modalState.data.id,
					checkData,
				});
				clearFilters();
			}

			if (modalState.type === "search") {
				applyFilters(checkData);
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
			key: "budgetId",
			label: "Presupuesto",
			width: "w-[10%]",
			render: (payments) => `${payments.budgetId}`,
		},
		{
			key: "amount",
			label: "Monto",
			width: "w-[20%]",
			render: (payments) => `$${Number(payments.amount).toFixed(2)}`,
		},
		{
			key: "date",
			label: "Recibido",
			width: "w-[20%]",
			render: (payments) => `${payments.date.split("-").reverse().join("/")}`,
		},
		{
			key: "checkExchangeDate",
			label: "Cambiado",
			width: "w-[20%]",
			render: (payments) =>
				payments.checkExchangeDate ? (
					payments.checkExchangeDate?.split("-").reverse().join("/")
				) : (
					<span className="text.neutral-500 italic">Sin cambiar</span>
				),
		},
		{
			key: "checkEntity",
			label: "Entidad",
			width: "w-[20%]",
			render: (payments) =>
				payments.checkEntity ? (
					payments.checkEntity?.split("-").reverse().join("/")
				) : (
					<span className="text.neutral-500 italic">Sin entidad</span>
				),
		},
	];

	const renderActions = (payments) => (
		<>
			<Button
				variant="ghost"
				title="Realizar cambio"
				onClick={() =>
					setModalState({
						type: "update",
						entity: "matarial",
						data: payments,
					})
				}
			>
				<Banknote size={16} />
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
	} = usePagination((state) => state.payments, getAllChecks);

	const hasActiveFilters = Object.keys(filters || {}).length > 0;

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando Cheques..."} />
			</div>
		);
	}

	const onSearch = () => {
		setModalState({
			type: "search",
			entity: "payment",
			data: null,
		});
	};

	return (
		<SectionList
			list="cheque"
			title="Cheques"
			onSearch={onSearch}
			onClearSearch={hasActiveFilters ? clearFilters : undefined}
		>
			<TableList
				columns={columns}
				data={checks}
				renderActions={renderActions}
				emptyMessage="No hay cheques registrados"
			/>
			<Pagination
				page={page}
				totalPages={totalPages}
				hasPrev={hasPrev}
				hasNext={hasNext}
				onPageChange={goToPage}
			/>
			<CheckUpdateModal
				open={modalState?.type === "update"}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
			<CheckSearchModal
				open={modalState?.type === "search"}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
		</SectionList>
	);
};

export default ChecksList;
