import { useParams } from "react-router-dom";
import Button from "@components/Common/Button.jsx";
import Loading from "@components/Common/Loading.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "@redux/Slices/productSlice.js";
import { Pencil, Banknote, FileText, ClipboardCheck } from "lucide-react";

const ProductDetail = () => {
	const { id } = useParams();
	const product = useSelector((state) => state.products.product);
	const loading = useSelector((state) => state.products.loading);
	const { run } = useCrudDispatch();
	const productId = parseInt(id, 10);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProductById(productId));
	}, [dispatch, productId]);

	const materialsCost = Number(product?.totalMaterialsCost || 0)
	const productionCost = Number(product?.productionCost || 0)
	const totalCost = materialsCost + productionCost

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando producto..."} />
			</div>
		);
	}
	return (
		<section className="bg-white rounded-xl border border-neutral-200 shadow-md p-8 min-h-full">
			<div className="flex justify-between items-center mb-10">
				<h2 className="font-bold text-2xl">Producto: #{product?.id} - {product?.name}</h2>
				<Button variant="primary" className="flex items-center gap-2">
					<Pencil size={16} />
					Editar Producto
				</Button>
			</div>
			<div className="grid grid-cols-[3fr_1fr] justify-between gap-12">
				<div className="flex flex-col gap-8 my-auto">
				<section className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<FileText size={28} className="text-primary-500"/>
						<span className="text-lg font-semibold">Descripción</span>
					</div>
					<div className="border-neutral-200 border rounded-xl shadow-md">
						<div className="p-4 h-30 overflow-y-auto">
							<p>{product?.description}</p>
						</div>
					</div>
				</section>
<section className="flex flex-col gap-4">
	<div className="flex items-center gap-2">
		<ClipboardCheck size={28} className="text-primary-500" />
		<span className="text-lg font-semibold">Materiales</span>
	</div>

	<div className="border border-neutral-200 rounded-xl shadow-md overflow-hidden">
		<div className="max-h-80 overflow-y-auto">
			<table className="w-full">
				<thead className="bg-neutral-100 text-neutral-500 text-sm">
					<tr className="font-semibold">
						<th className="w-[70%] px-6 py-3 text-left">
							NOMBRE DEL MATERIAL
						</th>
						<th className="w-[25%] px-6 py-3 text-left">
							PROVEEDOR
						</th>
						<th className="w-[5%] px-6 py-3 text-center">
							CANTIDAD
						</th>
					</tr>
				</thead>
				<tbody>
					{!product?.productMaterials?.length && (
						<tr>
								<td colSpan={3} className="text-center py-4 text-neutral-500">
									No hay materiales registrados en el producto
								</td>
						</tr>
					)}
					{product?.productMaterials?.map((material) => (
						<tr
							key={material?.id}
							className="border-b border-neutral-200 last:border-b-0"
						>
							<td className="px-6 py-3">
								{material?.material.name}
							</td>
							<td className="px-6 py-3">
								{material?.material.provider}
							</td>
							<td className="px-6 py-3 text-center">
								{Number(material?.quantity)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</div>
</section>
				</div>
				<section className="border-neutral-200 border rounded-xl shadow-md">
					<div className="flex flex-col">
						<div className="flex justify-center items-center bg-primary-500 rounded-t-xl h-20 gap-2 text-white">
						<Banknote size={20} />
						<span className="text-lg font-semibold">Resumen Financiero</span>
						</div>
						<div className="min-h-140">
							<div className="p-6 grid grid-rows-[1fr_1fr_1fr_1fr] gap-6 min-h-140">
								<div className="flex flex-col items-center text-center">
									<span className="text-neutral-500 text-lg">Costo Total de Materiales:</span>
									<span className="font-semibold text-xl">
										${materialsCost.toFixed(2)}
									</span>
								</div>
								<div className="flex flex-col items-center text-center">
									<span className="text-neutral-500 text-lg">Costo de Producción:</span>
									<span className="font-semibold text-xl">
										${productionCost.toFixed(2)}
									</span>
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
					</div>
				</section>
			</div>
		</section>
	)
};

export default ProductDetail;
