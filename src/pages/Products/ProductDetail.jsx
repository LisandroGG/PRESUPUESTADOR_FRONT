import { useParams } from "react-router-dom";
import Button from "@components/Common/Button.jsx";
import Loading from "@components/Common/Loading.jsx";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "@redux/Slices/productSlice.js";
import { Pencil } from "lucide-react";

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

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando producto..."} />
			</div>
		);
	}
	return (
		<section className="bg-white rounded-md shadow-md p-4 min-h-full">
			<div className="flex justify-between items-center mb-6">
				<h2>Producto: #{product?.id} - {product?.name}</h2>
				<Button variant="primary" className="flex items-center gap-2">
					<Pencil size={16} />
					Editar Producto
				</Button>
			</div>
			<div>
				<p><strong>Descripción:</strong> {product?.description}</p>
				<p><strong>Materiales: {product?.productMaterials?.map((material) => (
					<div key={material?.id}>
					<span>{material?.material.name} - </span>
					<span>{Number(material?.quantity)}</span>
					</div>
				))}</strong></p>
			</div>
		</section>
	)
};

export default ProductDetail;
