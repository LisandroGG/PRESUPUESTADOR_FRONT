import Modal from "@components/Common/Modal.jsx";
import Input from "@components/common/Input.jsx";
import { validateProductName } from "@utils/validations/productValidations.js";
import { useState } from "react";

const ProductSearchModal = ({ open, onCancel, onConfirm }) => {
	const [name, setName] = useState("");
	const [error, setError] = useState(null);
	const isValid = name.trim() !== "";

	const clearFields = () => {
		setName("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		setError(null);
		if (name.trim()) {
			const nameError = validateProductName(name);
			if (nameError) {
				setError(nameError);
				return;
			}
		}
		onConfirm({
			name: name.trim() || undefined,
		});
	};

	if (!open) return null;

	return (
		<Modal
			title="Buscar producto"
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			confirmText={"Buscar"}
			error={error}
			disabled={!isValid}
		>
			<Input
				className="w-full border p-2 rounded"
				placeholder="Nombre"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</Modal>
	);
};

export default ProductSearchModal;
