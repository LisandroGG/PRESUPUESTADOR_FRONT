import Button from "@components/Common/Button.jsx";
import ConfirmModal from "@components/Common/ConfirmModal.jsx";
import Loading from "@components/Common/Loading.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import { getAllMaterials } from "@redux/Slices/materialSlice";
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
import { Link, useParams } from "react-router-dom";
import ProductMaterialsFormModal from "./ProductMaterialsFormModal";

const ProductDetail = () => {
	const { id } = useParams();
	const productId = parseInt(id, 10);

	const { run } = useCrudDispatch();
	const product = useSelector((state) => state.products.product);
	const { materials } = useSelector((state) => state.materials);
	const loading = useSelector((state) => state.products.loading);
	const [originalData, setOriginalData] = useState(null);

	const [isEditing, setIsEditing] = useState(false);
	const [modalState, setModalState] = useState(false);
	const [deleteModalState, setDeleteModalState] = useState(null);
	const [materialsModalOpen, setMaterialsModalOpen] = useState(false);

	const [productData, setProductData] = useState({
		name: "",
		description: "",
		materials: [],
		productionCost: 0,
	});

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		run(getProductById, productId);
		run(getAllMaterials);
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

		setMaterialsModalOpen(false);
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
			setDeleteModalState(null);
			return;
		}
		setModalState(true);
	};

	const handleConfirmCancel = () => {
		setIsEditing(false);
		setProductData({
			name: product?.name || "",
			description: product?.description || "",
			materials: product?.productMaterials || [],
			productionCost: product?.productionCost || 0,
		});
		setModalState(false);
		setDeleteModalState(null);
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
		<section className="bg-white rounded-xl border border-neutral-200 shadow-md p-8 min-h-full">
			<div className="flex justify-between items-center mb-8">
				<div className="flex flex-col">
					<Link
						to="/products"
						className="flex items-center text-lg hover:text-primary-500"
					>
						<ArrowLeft size={20} />
						Atrás
					</Link>

					<div className="flex font-bold text-3xl gap-2">
						<h2>Producto: #{product?.id}</h2>
						<span>-</span>
						{isEditing ? (
							<input
								type="text"
								name="name"
								value={productData.name}
								onChange={handleChange}
								className="ring-2 ring-primary-500 rounded-md"
							/>
						) : (
							<span>{product?.name || "Sin nombre"}</span>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2">
					{!isEditing ? (
						<Button
							variant="primary"
							className="flex items-center gap-2"
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
							<Button variant="primary" onClick={handleSave}>
								Guardar cambios
							</Button>
						</>
					)}
				</div>
			</div>

			<div className="grid grid-cols-[3fr_1fr] justify-between gap-12">
				<div className="flex flex-col gap-8 my-auto">
					<section className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<FileText size={28} className="text-primary-500" />
							<span className="text-lg font-semibold">Descripción</span>
						</div>

						<div className="border-neutral-200 border rounded-xl shadow-md">
							<div className="p-4 max-h-45 overflow-y-auto no-scrollbar">
								{isEditing ? (
									<textarea
										name="description"
										value={productData.description}
										onChange={handleChange}
										className="w-full resize-none no-scrollbar ring-2 ring-primary-500 rounded-md"
									/>
								) : (
									<p>{product?.description || "Sin descripción"}</p>
								)}
							</div>
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<div className="flex justify-between">
							<div className="flex items-center gap-2">
								<ClipboardCheck size={28} className="text-primary-500" />
								<span className="text-lg font-semibold">Materiales</span>
							</div>

							{isEditing && (
								<Button
									variant="primary"
									onClick={() => setMaterialsModalOpen(true)}
								>
									Agregar Material
								</Button>
							)}
						</div>

						<div className="border border-neutral-200 rounded-xl shadow-md overflow-hidden">
							<div className="h-80 overflow-y-auto">
								<table className="w-full">
									<thead className="bg-neutral-100 text-neutral-500 text-sm">
										<tr className="font-semibold">
											<th className="w-[70%] px-6 py-3 text-left">
												NOMBRE DEL MATERIAL
											</th>
											<th className="w-[25%] px-6 py-3 text-left">PROVEEDOR</th>
											<th className="w-[5%] px-6 py-3 text-center">CANTIDAD</th>
											{isEditing && (
												<th className="text-center px-6 py-3">ACCIONES</th>
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
													{Number(material.quantity).toFixed(2)}
												</td>
												{isEditing && (
													<td className="px-6 py-3 text-center">
														{isEditing && (
															<Button
																variant="danger"
																onClick={() =>
																	setDeleteModalState({
																		type: "delete-material",
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
				<section className="border-neutral-200 border rounded-xl shadow-md">
					<div className="flex justify-center items-center bg-primary-500 rounded-t-xl h-20 gap-2 text-white">
						<Banknote size={20} />
						<span className="text-lg font-semibold">Resumen Financiero</span>
					</div>

					<div className="min-h-140">
						<div className="p-6 grid grid-rows-[1fr_1fr_1fr] gap-6 min-h-120">
							<div className="flex flex-col items-center text-center">
								<span className="text-neutral-500 text-lg">
									Costo Total de Materiales:
								</span>
								<span className="font-semibold text-xl">
									${materialsCost.toFixed(2)}
								</span>
							</div>

							<div className="flex flex-col items-center text-center">
								<span className="text-neutral-500 text-lg">
									Costo de Producción:
								</span>
								{isEditing ? (
									<input
										type="number"
										name="productionCost"
										value={productData.productionCost}
										onChange={handleChange}
										className="text-center font-semibold text-xl ring-2 ring-primary-500 rounded-md"
									/>
								) : (
									<span className="font-semibold text-xl">
										${productionCost.toFixed(2)}
									</span>
								)}
							</div>

							<div className="flex flex-col items-center text-center text-lg">
								<span className="text-neutral-500">Costo Total:</span>
								<span className="font-semibold text-xl">
									${totalCost.toFixed(2)}
								</span>
							</div>

							<hr />

							<div className="flex flex-col items-center text-center text-primary-500">
								<span className="font-semibold text-lg">Precio de venta:</span>
								<span className="font-semibold text-2xl">
									${totalCost.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>
			<ConfirmModal
				open={modalState}
				title="Cancelar edición"
				description="¿Estás seguro que no quieres guardar los cambios?"
				onCancel={() => setModalState(false)}
				onConfirm={handleConfirmCancel}
			/>
			<ConfirmModal
				open={deleteModalState?.type === "delete-material"}
				title="Eliminar material"
				description="¿Estás seguro que deseas eliminar este material del producto?"
				onCancel={() => setDeleteModalState(null)}
				onConfirm={() => {
					setProductData((prev) => ({
						...prev,
						materials: prev.materials.filter(
							(m) => (m.id ?? m.tempId) !== deleteModalState.data.key,
						),
					}));
					setDeleteModalState(null);
				}}
			/>
			<ProductMaterialsFormModal
				open={materialsModalOpen}
				onConfirm={handleAddMaterial}
				onCancel={() => setMaterialsModalOpen(false)}
				materials={materials}
			/>
		</section>
	);
};

export default ProductDetail;
