import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import {
	getBudgetById,
	updateBudget,
	updateBudgetStatus,
} from "@redux/slices/budgetSlice.js";
import { createPayment, deletePayment } from "@redux/slices/paymentSlice.js";
import { getAllProductsForSelect } from "@redux/slices/productSlice.js";
import {
	ArrowLeft,
	Banknote,
	ClipboardCheck,
	FileCheckCorner,
	FileText,
	Pencil,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AddPaymentModal from "./AddPaymentModal.jsx";
import ChangeStatusModal from "./ChangeStatusModal.jsx";
import ProductsFormModal from "./ProductsFormModal";

const BudgetDetail = () => {
	const { id } = useParams();
	const budgetId = parseInt(id, 10);

	const { run } = useCrudDispatch();
	const budget = useSelector((state) => state.budgets.budget);
	const { products } = useSelector((state) => state.products);
	const loading = useSelector((state) => state.budgets.loading);
	const [originalData, setOriginalData] = useState(null);

	const [isEditing, setIsEditing] = useState(false);
	const [modalState, setModalState] = useState(null);

	const [budgetData, setBudgetData] = useState({
		description: "",
		items: [],
	});

	const LOCAL = import.meta.env.VITE_LOCAL;

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		run(getBudgetById, budgetId);
		run(getAllProductsForSelect);
	}, [budgetId]);

	useEffect(() => {
		if (budget) {
			setBudgetData({
				description: budget.description || "",
				items: budget.items || [],
			});
		}
	}, [budget]);

	const downloadPdf = (id) => {
		const link = document.createElement("a");
		link.href = `${LOCAL}/budgets/pdf/${id}`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleAddProduct = (newProduct) => {
		const productData = products.find((p) => p.id === newProduct.productId);

		if (!productData) return;

		setBudgetData((prev) => {
			const exists = prev.items.some(
				(i) => (i.productId ?? i.product?.id) === newProduct.productId,
			);

			if (exists) return prev;

			return {
				...prev,
				items: [
					...prev.items,
					{
						productId: newProduct.productId,
						quantity: newProduct.quantity,
						product: productData,
						tempId: crypto.randomUUID(),
					},
				],
			};
		});

		setModalState(null);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBudgetData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const hasChanges = () => {
		return JSON.stringify(budgetData) !== JSON.stringify(originalData);
	};

	const handleSave = async () => {
		const payload = {
			description: budgetData.description,
			items: Array.isArray(budgetData.items)
				? budgetData.items.map((i) => ({
						productId: Number(i.product.id),
						quantity: Number(i.quantity),
					}))
				: [],
		};

		await run(updateBudget, {
			budgetId,
			budgetData: payload,
		});

		await run(getBudgetById, budgetId);
		setIsEditing(false);
	};

	const handleCancelClick = () => {
		if (!hasChanges()) {
			setIsEditing(false);
			return;
		}
		setModalState({ type: "cancelEdit" });
	};

	const handleConfirmCancel = () => {
		setIsEditing(false);
		setBudgetData({
			description: budget?.description || "",
			items: budget?.items || [],
		});
		setModalState(null);
	};

	const handleChangeStatus = async () => {
		await run(updateBudgetStatus, {
			budgetId,
			status: "approved",
		});
		await run(getBudgetById, budgetId);
		setModalState(null);
	};

	const handleAddPayment = async (paymentData) => {
		try {
			await run(createPayment, {
				...paymentData,
				budgetId,
			});
			await run(getBudgetById, budgetId);
			setModalState(null);
		} catch (error) {
			console.error("Error al registrar el pago:", error);
		}
	};

	const productsToRender = isEditing ? budgetData.items : budget?.items;

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText="Cargando presupuesto..." />
			</div>
		);
	}
	return (
		<section className="bg-white rounded-xl border border-neutral-200 shadow-md p-6 min-h-full grid">
			<div className="flex justify-between items-center mb-6">
				<div>
					<Link
						to="/budgets"
						className="flex items-center hover:text-primary-500"
					>
						<ArrowLeft size={20} />
						Atrás
					</Link>

					<div className="flex font-bold text-2xl gap-2">
						<h2>Presupuesto: #{budget?.id}</h2>
						<span>-</span>
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
					</div>
				</div>

				<div className="flex gap-2">
					{!isEditing ? (
						<>
							<Button
								variant="primary"
								className="flex items-center gap-1"
								onClick={() => downloadPdf(budgetId)}
							>
								<FileText size={16} />
								Descargar PDF
							</Button>
							{budget?.status !== "pending" && budget?.status !== "paid" ? (
								<Button
									variant="primary"
									className="flex items-center gap-1"
									onClick={() => {
										setModalState({ type: "registerPayment" });
									}}
								>
									<Banknote size={16} />
									Registrar Pago
								</Button>
							) : (
								""
							)}

							{budget?.status === "pending" ? (
								<>
									<Button
										variant="primary"
										className="flex items-center gap-1"
										onClick={() => {
											setOriginalData(budgetData);
											setIsEditing(true);
										}}
									>
										<Pencil size={16} />
										Editar Presupuesto
									</Button>
									<Button
										variant="primary"
										className="flex items-center gap-1"
										onClick={() => {
											setModalState({ type: "changeStatus" });
										}}
									>
										<FileCheckCorner size={16} />
										Cambiar Estado
									</Button>
								</>
							) : (
								""
							)}
						</>
					) : (
						<>
							<Button variant="ghost" onClick={handleCancelClick}>
								Cancelar
							</Button>
							<Button
								variant="primary"
								onClick={handleSave}
								disabled={!hasChanges()}
							>
								Guardar cambios
							</Button>
						</>
					)}
				</div>
			</div>

			<div className="grid grid-cols-[6fr_4fr] justify-between gap-4">
				<div className="flex flex-col mx-auto lg:mx-0 lg:my-auto gap-8">
					<section className="flex flex-col gap-2">
						<div className="flex items-center gap-1">
							<FileText size={28} className="text-primary-500" />
							<span className="font-semibold">Descripción</span>
						</div>

						<div className="border-neutral-200 border rounded-xl shadow-md max-w-[40vw]">
							<div className="p-2 h-25 lg:h-40 overflow-y-auto no-scrollbar wrap-break-word whitespace-normal">
								{isEditing ? (
									<textarea
										name="description"
										value={budgetData.description}
										onChange={handleChange}
										className="w-full h-35 resize-none no-scrollbar ring-2 ring-primary-500 rounded-md"
									/>
								) : (
									<p>{budget?.description || "Sin descripción"}</p>
								)}
							</div>
						</div>
					</section>

					<section className="flex flex-col gap-2 max-w-[40vw]">
						<div className="flex justify-between">
							<div className="flex items-center gap-1">
								<ClipboardCheck size={28} className="text-primary-500" />
								<span className="font-semibold">Productos</span>
							</div>

							{isEditing && (
								<Button
									variant="primary"
									onClick={() => {
										setModalState({ type: "addProduct" });
									}}
								>
									Agregar Producto
								</Button>
							)}
						</div>

						<div className="border border-neutral-200 rounded-xl shadow-md overflow-hidden">
							<div className="h-58 overflow-y-auto">
								<table className="w-full">
									<thead className="bg-neutral-100 text-neutral-500 text-sm">
										<tr className="font-semibold">
											<th
												className={`px-6 py-3 text-left ${isEditing ? "w-[80%]" : "w-[90%]"}`}
											>
												NOMBRE DEL PRODUCTO
											</th>
											<th className="px-6 py-3 text-center">CANTIDAD</th>
											{isEditing && (
												<th className="px-6 py-3 text-center">ACCIONES</th>
											)}
										</tr>
									</thead>
									<tbody>
										{!productsToRender?.length && (
											<tr>
												<td
													colSpan={isEditing ? 3 : 2}
													className="text-center py-4 text-neutral-500"
												>
													No hay productos registrados en el presupuesto
												</td>
											</tr>
										)}
										{productsToRender?.map((product) => (
											<tr
												key={product.id ?? product.tempId}
												className="border-b border-neutral-200 last:border-b-0"
											>
												<td className="px-6 py-3">
													{isEditing ? (
														<span>
															{product.product?.name ||
																products.find(
																	(p) =>
																		p.id ===
																		(product.product?.id ?? product.productId),
																)?.name}
														</span>
													) : (
														<Link
															to={`/products/${product.product?.id}`}
															className="hover:text-primary-500 hover:font-semibold"
														>
															{product.product?.name ||
																products.find(
																	(p) =>
																		p.id ===
																		(product.product?.id ?? product.productId),
																)?.name}
														</Link>
													)}
												</td>
												<td className="px-6 py-3 text-center">
													{Number(product.quantity)}
												</td>
												{isEditing && (
													<td className="px-6 py-3 text-center">
														<Button
															variant="danger"
															onClick={() => {
																setModalState({
																	type: "deleteProduct",
																	data: {
																		key: product.id ?? product.tempId,
																	},
																});
															}}
														>
															<Trash2 size={16} />
														</Button>
													</td>
												)}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</section>
				</div>
				<section className="border-neutral-200 border rounded-xl shadow-md max-h-[70vh] h-[65vh]">
					<div className="flex justify-center items-center bg-primary-500 rounded-t-xl h-15 gap-1 text-white">
						<Banknote size={28} />
						<span className="font-semibold">Pagos del presupuesto</span>
					</div>
					<div className="p-4 border-b">
						<div className="flex flex-col gap-2">
							<div className="flex justify-between">
								<span className="text-neutral-500">Total</span>
								<span className="font-semibold">
									${Number(budget?.totals?.total || 0).toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between">
								<span className="text-neutral-500">Pagado</span>
								<span className="text-green-500 font-semibold">
									${Number(budget?.totals?.paid || 0).toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between">
								<span className="text-neutral-500">Restante</span>
								<span className="text-red-500 font-semibold">
									${Number(budget?.totals?.remaining || 0).toLocaleString()}
								</span>
							</div>
						</div>
					</div>
					<div className="max-h-[42vh] overflow-y-auto no-scrollbar">
						{budget?.payments?.length ? (
							<table className="w-full">
								<thead className="bg-neutral">
									<tr className="font-semibold text-sm">
										<th className="px-6 py-3 text-left">MÉTODO</th>
										<th className="px-6 py-3 text-center">MONTO</th>
										<th className="px-6 py-3 text-center">FECHA</th>
										{!isEditing && budget.status !== "paid" && (
											<th className="px-6 py-3 text-center">ACCIONES</th>
										)}
									</tr>
								</thead>
								<tbody>
									{budget.payments.map((payment) => (
										<tr
											key={payment.id}
											className="border-b border-neutral-200 last:border-b-0 text-sm"
										>
											<td className="px-6 py-3">{payment.method}</td>
											<td className="px-6 py-3 text-center">
												${Number(payment.amount).toFixed(2)}
											</td>
											<td className="px-6 py-3 text-center">
												{payment.date.split("-").reverse().join("/")}
											</td>
											{!isEditing && budget.status !== "paid" && (
												<td className="px-6 py-3 text-center">
													<Button
														variant="danger"
														onClick={() => {
															setModalState({
																type: "deletePayment",
																data: {
																	key: payment.id,
																},
															});
														}}
													>
														<Trash2 size={16} />
													</Button>
												</td>
											)}
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p className="text-center py-4 text-neutral-500">
								No hay pagos registrados para este presupuesto
							</p>
						)}
					</div>
				</section>
			</div>
			<ConfirmModal
				open={modalState?.type === "cancelEdit"}
				title="Cancelar edición"
				description="¿Estás seguro que no quieres guardar los cambios?"
				onCancel={() => setModalState(false)}
				onConfirm={handleConfirmCancel}
			/>
			<ConfirmModal
				open={modalState?.type === "deleteProduct"}
				title="Eliminar producto"
				description="¿Estás seguro que deseas eliminar este producto del presupuesto?"
				onCancel={() => setModalState(null)}
				onConfirm={() => {
					setBudgetData((prev) => ({
						...prev,
						items: prev.items.filter(
							(i) => (i.id ?? i.tempId) !== modalState.data.key,
						),
					}));
					setModalState(null);
				}}
			/>
			<ConfirmModal
				open={modalState?.type === "deletePayment"}
				title="Eliminar pago"
				description="¿Estás seguro que deseas eliminar este pago del presupuesto?"
				onCancel={() => setModalState(null)}
				onConfirm={async () => {
					try {
						await run(deletePayment, modalState.data.key);
						await run(getBudgetById, budgetId);
						setModalState(null);
					} catch (error) {
						console.error("Error al eliminar el pago:", error);
					}
				}}
			/>
			<ProductsFormModal
				open={modalState?.type === "addProduct"}
				onConfirm={handleAddProduct}
				onCancel={() => setModalState(null)}
				products={products}
			/>
			<AddPaymentModal
				open={modalState?.type === "registerPayment"}
				onCancel={() => setModalState(null)}
				onConfirm={handleAddPayment}
			/>
			<ChangeStatusModal
				open={modalState?.type === "changeStatus"}
				onConfirm={handleChangeStatus}
				onCancel={() => setModalState(null)}
			/>
		</section>
	);
};

export default BudgetDetail;
