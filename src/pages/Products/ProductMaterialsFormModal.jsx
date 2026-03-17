import Modal from "@components/Common/Modal.jsx";
import Input from "@components/common/Input.jsx";
import { validateProductMaterial } from "@utils/Validations/productValidations.js";
import { useState } from "react";

const ProductMaterialsFormModal = ({
	open,
	onCancel,
	onConfirm,
	materials,
}) => {
	const [materialId, setMaterialId] = useState("");
	const [quantity, setQuantity] = useState("");
	const [error, setError] = useState(null);
	const isValid = materialId !== "" && quantity;

	const clearFields = () => {
		setMaterialId("");
		setQuantity("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		const validateError = validateProductMaterial(materialId, quantity);
		if (validateError) {
			setError(validateError);
			return;
		}
		onConfirm({
			materialId: Number(materialId),
			quantity: Number(quantity),
		});

		clearFields();
	};

	if (!open) return null;

	return (
		<Modal
			title="Agregar material al producto"
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			disabled={!isValid}
			error={error}
		>
			<select
				className="w-full border p-2 rounded outline-none focus:border-primary-500 focus:border-2"
				value={materialId}
				onChange={(e) => setMaterialId(e.target.value)}
			>
				<option value="">Seleccione un material</option>
				{materials?.map((mat) => (
					<option key={mat.id} value={mat.id}>
						{mat.name}
					</option>
				))}
			</select>

			<Input
				type="number"
				min="1"
				className="w-full border p-2 rounded"
				placeholder="Cantidad"
				value={quantity}
				onChange={(e) => setQuantity(e.target.value)}
			/>
		</Modal>
	);
};

export default ProductMaterialsFormModal;
