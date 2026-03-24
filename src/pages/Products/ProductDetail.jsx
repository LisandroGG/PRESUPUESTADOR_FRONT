import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import { getAllMaterialsForSelect } from "@redux/Slices/materialSlice.js";
import { getProductById, updateProduct } from "@redux/Slices/productSlice.js";
import {
	ArrowLeft,
	Banknote,
	ClipboardCheck,
	FileText,
	Pencil,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductMaterialsFormModal from "./ProductMaterialsFormModal";

const ProductDetail = () => {
	const { id } = useParams();
	const productId = parseInt(id, 10);
	const navigate = useNavigate();

	const { run } = useCrudDispatch();
	const product = useSelector((state) => state.products.product);
	const { materials } = useSelector((state) => state.materials);
	const loading = useSelector((state) => state.products.loading);
	const [originalData, setOriginalData] = useState(null);

	const [isEditing, setIsEditing] = useState(false);
	const [modalState, setModalState] = useState(null);

	const [productData, setProductData] = useState({
		name: "",
		description: "",
		materials: [],
		productionCost: 0,
	});

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		run(getProductById, productId);
		run(getAllMaterialsForSelect);
	}, [productId]);

	useEffect(() => {
		if (product) {
			setProductData({
				name: product.name || "",
				description: product.description || "",
				materials: product.productMaterials || [],
				productionCost: product.productionCost || 0,
			});
		}
	}, [product]);

	const handleAddMaterial = (newMaterial) => {
		setProductData((prev) => {
			const exists = prev.materials.some(
				(m) => m.materialId === newMaterial.materialId,
			);

			if (exists) return prev;

			return {
				...prev,
				materials: [
					...prev.materials,
					{
						...newMaterial,
						tempId: crypto.randomUUID(),
					},
				],
			};
		});

		setModalState(null);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const hasChanges = () => {
		return JSON.stringify(productData) !== JSON.stringify(originalData);
	};

	const handleSave = async () => {
		const payload = {
			name: productData.name,
			description: productData.description,
			productionCost: Number(productData.productionCost),
			materials: Array.isArray(productData.materials)
				? productData.materials.map((m) => ({
						materialId: Number(m.materialId),
						quantity: Number(m.quantity),
					}))
				: [],
		};

		await run(updateProduct, {
			productId,
			productData: payload,
		});

		await run(getProductById, productId);
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
		setProductData({
			name: product?.name || "",
			description: product?.description || "",
			materials: product?.productMaterials || [],
			productionCost: product?.productionCost || 0,
		});
		setModalState(null);
	};

	const materialsCost = Number(product?.totalMaterialsCost || 0);
	const productionCost = Number(product?.productionCost || 0);
	const totalCost = materialsCost + productionCost;

	const materialsToRender = isEditing
		? productData.materials
		: product?.productMaterials;

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText="Cargando producto..." />
			</div>
		);
	}

	return (
		<section className="bg-white rounded-xl border border-neutral-200 shadow-md p-6 min-h-full grid">
			<div className="flex justify-between items-center mb-6">
				<div className="flex flex-col">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="flex items-center hover:text-primary-500 hover:cursor-pointer"
					>
						<ArrowLeft size={20} />
						Atrás
					</button>

					<div className="flex font-bold text-2xl gap-2">
						<h2>Producto: #{product?.id}</h2>
						<span>-</span>
						{isEditing ? (
							<input
								type="text"
								name="name"
								value={productData.name}
								onChange={handleChange}
								className="ring-2 ring-primary-500 rounded-md outline-none focus:border-primary-500"
							/>
						) : (
							<span>{product?.name || "Sin nombre"}</span>
						)}
					</div>
				</div>

				<div className="flex gap-2">
					{!isEditing ? (
						<Button
							variant="primary"
							className="flex items-center gap-1"
							onClick={() => {
								setOriginalData(productData);
								setIsEditing(true);
							}}
						>
							<Pencil size={16} />
							Editar Producto
						</Button>
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
										value={productData.description}
										onChange={handleChange}
										className="w-full h-35 resize-none no-scrollbar ring-2 ring-primary-500 rounded-md outline-none focus:border-primary-500"
									/>
								) : (
									<p>{product?.description || "Sin descripción"}</p>
								)}
							</div>
						</div>
					</section>

					<section className="flex flex-col gap-2 max-w-[40vw]">
						<div className="flex justify-between">
							<div className="flex items-center gap-1">
								<ClipboardCheck size={28} className="text-primary-500" />
								<span className="font-semibold">Materiales</span>
							</div>

							{isEditing && (
								<Button
									variant="primary"
									onClick={() => setModalState({ type: "addMaterial" })}
								>
									Agregar Material
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
												NOMBRE
											</th>
											<th className="px-6 py-3 text-left">PROVEEDOR</th>
											<th className="px-6 py-3 text-center">CANTIDAD</th>
											{isEditing && (
												<th className="px-6 py-3 text-center">ACCIONES</th>
											)}
										</tr>
									</thead>
									<tbody>
										{!materialsToRender?.length && (
											<tr>
												<td
													colSpan={isEditing ? 4 : 3}
													className="text-center py-4 text-neutral-500"
												>
													No hay materiales registrados en el producto
												</td>
											</tr>
										)}

										{materialsToRender?.map((material) => (
											<tr
												key={material.id ?? material.tempId}
												className="border-b border-neutral-200 last:border-b-0"
											>
												<td className="px-6 py-3">
													{material.material?.name ||
														materials.find((m) => m.id === material.materialId)
															?.name}
												</td>
												<td className="px-6 py-3">
													{material.material?.provider || "-"}
												</td>
												<td className="px-6 py-3 text-center">
													{Number(material.quantity)}
												</td>
												{isEditing && (
													<td className="px-6 py-3 text-center">
														{isEditing && (
															<Button
																variant="danger"
																onClick={() =>
																	setModalState({
																		type: "deleteMaterial",
																		data: {
																			key: material.id ?? material.tempId,
																		},
																	})
																}
															>
																<Trash2 size={16} />
															</Button>
														)}
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
				<section className="border-neutral-200 border rounded-xl shadow-md max-h-[70vh] h-[65vh] flex flex-col">
					<div className="flex justify-center items-center bg-primary-500 rounded-t-xl h-15 gap-1 text-white">
						<Banknote size={20} />
						<span className="font-semibold">Resumen Financiero</span>
					</div>

					<div className="p-6 flex flex-col flex-1 justify-between text-lg">
						<div className="flex flex-col gap-8">
							<div className="flex justify-between">
								<span className="text-neutral-500">
									Costo Total de Materiales:
								</span>
								<span className="font-semibold">
									${materialsCost.toFixed(2)}
								</span>
							</div>

							<div className="flex justify-between">
								<span className="text-neutral-500">Costo de Producción:</span>
								{isEditing ? (
									<input
										type="number"
										name="productionCost"
										value={productData.productionCost}
										onChange={handleChange}
										className="text-right font-semibold ring-2 ring-primary-500 rounded-md outline-none focus:border-primary-500"
									/>
								) : (
									<span className="font-semibold">
										${productionCost.toFixed(2)}
									</span>
								)}
							</div>

							<div className="flex justify-between">
								<span className="text-neutral-500">Costo Total:</span>
								<span className="font-semibold">${totalCost.toFixed(2)}</span>
							</div>
						</div>

						<div className="mt-6 pt-4 border-t border-neutral-200">
							<div className="flex flex-col items-center gap-1">
								<span className="font-semibold text-neutral-500 text-lg">
									Precio de venta
								</span>
								<span className="font-bold text-3xl text-primary-600">
									${totalCost.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>
			<ConfirmModal
				open={modalState?.type === "cancelEdit"}
				title="Cancelar edición"
				description="¿Estás seguro que no quieres guardar los cambios?"
				onCancel={() => setModalState(null)}
				onConfirm={handleConfirmCancel}
			/>
			<ConfirmModal
				open={modalState?.type === "deleteMaterial"}
				title="Eliminar material"
				description="¿Estás seguro que deseas eliminar este material del producto?"
				onCancel={() => setModalState(null)}
				onConfirm={() => {
					setProductData((prev) => ({
						...prev,
						materials: prev.materials.filter(
							(m) => (m.id ?? m.tempId) !== modalState.data.key,
						),
					}));
					setModalState(null);
				}}
			/>
			<ProductMaterialsFormModal
				open={modalState?.type === "addMaterial"}
				onConfirm={handleAddMaterial}
				onCancel={() => setModalState(null)}
				materials={materials}
			/>
		</section>
	);
};

export default ProductDetail;
