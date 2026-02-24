import Modal from "@components/Common/Modal.jsx";
import { validateBudgetProduct } from "@utils/Validations/budgetValidations.js";
import { useState } from "react";

const ProductsFormModal = ({ open, onCancel, onConfirm, products }) => {
	const [productId, setProductId] = useState("");
	const [quantity, setQuantity] = useState("");
	const [error, setError] = useState(null);
	const isValid = productId !== "" && quantity;

	const clearFields = () => {
		setProductId("");
		setQuantity("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		const validateError = validateBudgetProduct(productId, quantity);
		if (validateError) {
			setError(validateError);
			return;
		}
		onConfirm({
			productId: Number(productId),
			quantity: Number(quantity),
		});
		clearFields();
	};

	if (!open) return null;

	return (
		<Modal
			title="Agregar producto al presupuesto"
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			disabled={!isValid}
			error={error}
		>
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
		</Modal>
	);
};

export default ProductsFormModal;
