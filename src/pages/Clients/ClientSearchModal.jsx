import Modal from "@components/Common/Modal.jsx";
import { useState } from "react";
import { validateClientName } from "@utils/validations/clientValidations.js"

const ClientSearchModal = ({ open, onCancel, onConfirm }) => {
	const [name, setName] = useState("");
	const [cuit, setCuit] = useState("");
    const [error, setError] = useState(null);

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
        const validationError = validateClientName(name);
		if (validationError) {
			setError(validationError);
			return;
		}
		onConfirm({
			name: name || undefined,
			cuit: cuit || undefined,
		});
	};

    if (!open) return null;

	return (
		<Modal
			title="Buscar clientes"
			onCancel={handleCancel}
			onConfirm={handleSubmit}
            confirmText={"Buscar"}
            error={error}
		>
				<input
                    className="w-full border p-2 rounded"
                    placeholder="Nombre"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
                    type="number"
                    className="w-full border p-2 rounded"
                    placeholder="CUIT"
					value={cuit}
					onChange={(e) => setCuit(e.target.value)}
				/>
		</Modal>
	);
};

export default ClientSearchModal;