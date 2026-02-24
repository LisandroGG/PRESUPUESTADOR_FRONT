import Modal from "@components/Common/Modal.jsx";
import { validateMaterial } from "@utils/Validations/materialValidations.js";
import { useEffect, useMemo, useState } from "react";

const MaterialFormModal = ({
	open,
	mode,
	initialData,
	onCancel,
	onConfirm,
}) => {
	const [name, setName] = useState("");
	const [provider, setProvider] = useState("");
	const [cost, setCost] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		if (open) {
			setName(initialData?.name || "");
			setProvider(initialData?.provider || "");
			setCost(initialData?.cost || "");
			setError(null);
		}
	}, [initialData, open]);
	const isValid = name.trim() !== "" && provider.trim() !== "" && cost !== "";

	const hasChanges = useMemo(() => {
		if (mode === "create") return true;

		return (
			name !== (initialData?.name || "") ||
			provider !== (initialData?.provider || "") ||
			cost !== (initialData?.cost || "")
		);
	}, [mode, name, provider, cost, initialData]);

	const isDisabled = mode === "create" ? !isValid : !isValid || !hasChanges;

	const handleSubmit = () => {
		const validateError = validateMaterial(name, provider, cost);
		if (validateError) {
			setError(validateError);
			return;
		}

		onConfirm({
			name: name.trim(),
			provider: provider.trim(),
			cost: Number(cost),
		});
	};

	if (!open) return null;

	return (
		<Modal
			title={mode === "create" ? "Nuevo material" : "Editar material"}
			onCancel={onCancel}
			onConfirm={handleSubmit}
			disabled={isDisabled}
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
				placeholder="Proveedor"
				value={provider}
				onChange={(e) => setProvider(e.target.value)}
			/>
			<input
				type="number"
				className="w-full border p-2 rounded"
				placeholder="Costo"
				value={cost}
				onChange={(e) => setCost(e.target.value)}
			/>
		</Modal>
	);
};

export default MaterialFormModal;
