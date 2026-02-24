import Modal from "@components/Common/Modal.jsx";
import { validateProduct } from "@utils/Validations/productValidations.js";
import { useState } from "react";

const ProductFormModal = ({ open, onCancel, onConfirm }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState(null);
	const isValid = name.trim() !== "" && description.trim() !== "";

	const clearFields = () => {
		setName("");
		setDescription("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		const validateError = validateProduct(name, description);
		if (validateError) {
			setError(validateError);
			return;
		}
		onConfirm({
			name: name.trim(),
			description: description.trim(),
		});

		clearFields();
	};

	if (!open) return null;

	return (
		<Modal
			title={"Nuevo producto"}
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			disabled={!isValid}
			error={error}
		>
			<input
				className="w-full border p-2 rounded"
				placeholder="Nombre"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				className="w-full border p-2 rounded"
				placeholder="Descripción"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
		</Modal>
	);
};

export default ProductFormModal;
