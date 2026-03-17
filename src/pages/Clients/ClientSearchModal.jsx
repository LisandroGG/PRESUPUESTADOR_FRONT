import Modal from "@components/Common/Modal.jsx";
import Input from "@components/common/Input.jsx";
import { validateClientName } from "@utils/validations/clientValidations.js";
import { useState } from "react";

const ClientSearchModal = ({ open, onCancel, onConfirm }) => {
	const [name, setName] = useState("");
	const [cuit, setCuit] = useState("");
	const [error, setError] = useState(null);
	const isValid = name.trim() !== "" || cuit.trim() !== "";

	const clearFields = () => {
		setName("");
		setCuit("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		setError(null);
		if (name.trim()) {
			const nameError = validateClientName(name);
			if (nameError) {
				setError(nameError);
				return;
			}
		}
		onConfirm({
			name: name.trim() || undefined,
			cuit: cuit.trim() || undefined,
		});
	};

	if (!open) return null;

	return (
		<Modal
			title="Buscar cliente"
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			confirmText={"Buscar"}
			error={error}
			disabled={!isValid}
		>
			<Input
				placeholder="Nombre"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				type="number"
				placeholder="CUIT"
				value={cuit}
				onChange={(e) => setCuit(e.target.value)}
			/>
		</Modal>
	);
};

export default ClientSearchModal;
