import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import TableList from "@components/Common/TableList.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import {
	createBudget,
	deleteBudget,
	getAllBudgets,
	getAllBudgetsFromClient,
	updateBudgetStatus,
} from "@redux/Slices/budgetSlice";
import { getAllClientsForSelect } from "@redux/Slices/clientSlice.js";
import { Settings, SquarePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BudgetFormModal from "./BudgetFormModal.jsx";
import ChangeStatusModal from "./ChangeStatusModal.jsx";

const BudgetsList = () => {
	const { budgets } = useSelector((state) => state.budgets);
	const { clients } = useSelector((state) => state.clients);
	const { run } = useCrudDispatch();

	const [modalState, setModalState] = useState(null);

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		run(getAllClientsForSelect);
	}, []);

	const handleCancel = () => {
		setModalState(null);
	};

	const handleConfirm = async (budgetData) => {
		if (!modalState) return;
		try {
			if (modalState.type === "delete") {
				await run(deleteBudget, modalState.data.id);
				await run(getAllBudgets);
			}

			if (modalState.type === "create") {
				await run(createBudget, budgetData);
				await run(getAllBudgets);
			}

			if (modalState.type === "changeStatus") {
				await run(updateBudgetStatus, {
					budgetId: modalState.data.id,
					status: budgetData,
				});
				await run(getAllBudgets);
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
			key: "description",
			label: "Descripción",
			width: "w-[30%]",
			render: (budget) => (
				<Link
					to={`/budgets/${budget.id}`}
					className="hover:text-primary-500 hover:font-semibold"
				>
					{budget.description}
				</Link>
			),
		},
		{
			key: "client",
			label: "Cliente",
			width: "w-[25%]",
			render: (budget) =>
				budget.client ? (
					budget.client?.name || budget.client?.cuit
				) : (
					<span className="italic text-neutral-500">Sin cliente asignado</span>
				),
		},
		{
			key: "status",
			label: "Estado",
			width: "w-[10%]",
			render: (budget) => (
				<span>
					{budget?.status === "pending" && (
						<span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center">
							Pendiente
						</span>
					)}
					{budget?.status === "approved" && (
						<span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm flex items-center">
							Confirmado
						</span>
					)}
					{budget?.status === "paid" && (
						<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
							Saldado
						</span>
					)}
				</span>
			),
		},
	];

	const renderActions = (budget) => (
		<>
			<Button
				variant="ghost"
				title="Editar"
				onClick={() => {
					setModalState({
						type: "changeStatus",
						entity: "budget",
						data: budget,
					});
				}}
			>
				<Settings size={16} />
			</Button>
			<Button
				variant="danger"
				title="Eliminar"
				onClick={() =>
					setModalState({
						type: "delete",
						entity: "budget",
						data: budget,
					})
				}
			>
				<Trash2 size={16} />
			</Button>
		</>
	);

	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.budgets, getAllBudgets);

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando presupuestos..."} />
			</div>
		);
	}

	return (
		<section className="bg-white rounded-xl border border-neutral-200 shadow-md p-6 min-h-full">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Presupuestos:</h2>
				<Button
					variant="primary"
					className="flex items-center gap-2"
					onClick={() =>
						setModalState({
							type: "create",
							entity: "budget",
							data: null,
						})
					}
				>
					<SquarePlus size={16} />
					Crear presupuesto
				</Button>
			</div>

			<TableList
				columns={columns}
				data={budgets}
				renderActions={renderActions}
				empryMessage="No hay presupuestos registrados"
			/>

			<Pagination
				page={page}
				totalPages={totalPages}
				hasPrev={hasPrev}
				hasNext={hasNext}
				onPageChange={goToPage}
			/>

			{modalState?.type === "create" && (
				<BudgetFormModal
					open
					clients={clients}
					onCancel={handleCancel}
					onConfirm={handleConfirm}
				/>
			)}

			<ConfirmModal
				open={modalState?.type === "delete"}
				title="Eliminar presupuesto"
				description="¿Estás seguro que desear eliminar este presupuesto?"
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>

			{modalState?.type === "changeStatus" && (
				<ChangeStatusModal
					open
					initialStatus={modalState?.data}
					onCancel={handleCancel}
					onConfirm={handleConfirm}
				/>
			)}
		</section>
	);
};

export default BudgetsList;
