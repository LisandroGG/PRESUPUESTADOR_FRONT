import Modal from "@components/Common/Modal.jsx";
import {
	validateMaterialName,
	validateMaterialProvider,
} from "@utils/Validations/materialValidations";
import { useState } from "react";

const MaterialSearchModal = ({ open, onCancel, onConfirm }) => {
	const [name, setName] = useState("");
	const [provider, setProvider] = useState("");
	const [error, setError] = useState(null);
	const isValid = name.trim() !== "" || provider.trim() !== "";

	const clearFields = () => {
		setName("");
		setProvider("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		setError(null);
		if (name.trim()) {
			const nameError = validateMaterialName(name);
			if (nameError) {
				setError(nameError);
				return;
			}
		}

		if (provider.trim()) {
			const providerError = validateMaterialProvider(provider);
			if (providerError) {
				setError(providerError);
				return;
			}
		}
		onConfirm({
			name: name.trim() || undefined,
			provider: provider.trim() || undefined,
		});
	};

	if (!open) return null;

	return (
		<Modal
			title="Buscar material"
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			confirmText={"Buscar"}
			error={error}
			disabled={!isValid}
		>
			<input
				className="w-full border p-2 rounded"
				placeholder="Nombre"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				className="w-full border p-2 rounded"
				placeholder="Proveedor"
				value={provider}
				onChange={(e) => setProvider(e.target.value)}
			/>
		</Modal>
	);
};

export default MaterialSearchModal;
