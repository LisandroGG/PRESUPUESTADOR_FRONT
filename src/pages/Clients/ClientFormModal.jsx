import Modal from "@components/Common/Modal.jsx";
import Input from "@components/common/Input.jsx";
import { validateClientData } from "@utils/validations/clientValidations.js";
import { useEffect, useMemo, useState } from "react";

const ClientFormModal = ({ open, mode, initialData, onCancel, onConfirm }) => {
	const [name, setName] = useState("");
	const [cuit, setCuit] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		if (open) {
			setName(initialData?.name || "");
			setCuit(initialData?.cuit || "");
			setError(null);
		}
	}, [initialData, open]);

	const isValid = name.trim() !== "" && cuit !== "";

	const hasChanges = useMemo(() => {
		if (mode === "create") return true;

		return (
			name !== (initialData?.name || "") || cuit !== (initialData?.cuit || "")
		);
	}, [mode, name, cuit, initialData]);

	const isDisabled = mode === "create" ? !isValid : !isValid || !hasChanges;

	const handleSubmit = () => {
		const validationError = validateClientData(name, cuit);
		if (validationError) {
			setError(validationError);
			return;
		}

		onConfirm({
			name: name.trim(),
			cuit: cuit.trim(),
		});
	};

	if (!open) return null;

	return (
		<Modal
			title={mode === "create" ? "Nuevo cliente" : "Editar cliente"}
			onCancel={onCancel}
			onConfirm={handleSubmit}
			disabled={isDisabled}
			error={error}
		>
			<Input
				type="text"
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

export default ClientFormModal;
