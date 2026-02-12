import Button from "@components/Common/Button.jsx";
import { useState } from "react";

const ProductsFormModal = ({ open, onCancel, onConfirm, products }) => {
	const [productId, setProductId] = useState("");
	const [quantity, setQuantity] = useState("");

	const handleSubmit = () => {
		onConfirm({
			productId: Number(productId),
			quantity: Number(quantity),
		});
		setProductId("");
		setQuantity("");
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-semibold mb-4">Agregar producto</h3>
				<div className="space-y-4">
					<select
						className="w-full border p-2 rounded"
						value={productId}
						onChange={(e) => setProductId(e.target.value)}
					>
						<option value="">Seleccionar producto</option>
						{products.map((product) => (
							<option key={product.id} value={product.id}>
								{product.name}
							</option>
						))}
					</select>
					<input
						type="number"
						className="w-full border p-2 rounded"
						placeholder="Cantidad"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<div className="flex justify-end gap-2 mt-6">
						<Button variant="ghost" onClick={onCancel}>
							Cancelar
						</Button>
						<Button
							variant="primary"
							onClick={handleSubmit}
							disabled={!productId || !quantity}
						>
							Agregar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductsFormModal;
