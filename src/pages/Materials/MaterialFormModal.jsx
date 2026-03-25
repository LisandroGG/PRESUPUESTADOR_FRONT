import Modal from "@components/Common/Modal.jsx";
import Input from "@components/common/Input.jsx";
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
	const [tax, setTax] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		if (open) {
			setName(initialData?.name || "");
			setProvider(initialData?.provider || "");
			setCost(initialData?.cost || "");
			setTax(initialData?.tax ?? "");
			setError(null);
		}
	}, [initialData, open]);
	const isValid = name.trim() !== "" && provider.trim() !== "" && cost !== "";

	const hasChanges = useMemo(() => {
		if (mode === "create") return true;

		return (
			name !== (initialData?.name || "") ||
			provider !== (initialData?.provider || "") ||
			cost !== (initialData?.cost || "") ||
			tax !== (initialData?.tax || "")
		);
	}, [mode, name, provider, cost, tax, initialData]);

	const isDisabled = mode === "create" ? !isValid : !isValid || !hasChanges;

	const handleSubmit = () => {
		const validateError = validateMaterial(name, provider, cost, tax);
		if (validateError) {
			setError(validateError);
			return;
		}

		onConfirm({
			name: name.trim(),
			provider: provider.trim(),
			cost: Number(cost),
			tax: parseFloat(String(tax).replace(",", ".")) || 0,
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
			<Input
				placeholder="Nombre"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				placeholder="Proveedor"
				value={provider}
				onChange={(e) => setProvider(e.target.value)}
			/>
			<Input
				type="number"
				placeholder="Costo"
				value={cost}
				onChange={(e) => setCost(e.target.value)}
			/>
			<Input
				type="number"
				placeholder="Impuestos %"
				value={tax}
				onChange={(e) => setTax(e.target.value)}
			/>
		</Modal>
	);
};

export default MaterialFormModal;
