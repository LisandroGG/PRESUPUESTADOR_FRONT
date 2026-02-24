import Modal from "@components/Common/Modal.jsx";
import { validateBudget } from "@utils/Validations/budgetValidations.js";
import { useState } from "react";

const BudgetFormModal = ({ open, onCancel, onConfirm, clients }) => {
	const [clientId, setClientId] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState(null);
	const isValid = clientId !== "" && description.trim() !== "";

	const clearFields = () => {
		setClientId("");
		setDescription("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		const validateError = validateBudget(clientId, description);
		if (validateError) {
			setError(validateError);
			return;
		}
		onConfirm({
			clientId: Number(clientId),
			description: description.trim(),
		});

		clearFields();
	};

	if (!open) return null;

	return (
		<Modal
			title={"Nuevo presupuesto"}
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			disabled={!isValid}
			error={error}
		>
			<select
				className="w-full border p-2 rounded"
				value={clientId}
				onChange={(e) => setClientId(e.target.value)}
			>
				<option value="">Seleccione un cliente</option>
				{clients?.map((client) => (
					<option key={client.id} value={client.id}>
						{client.name || client.cuit}
					</option>
				))}
			</select>
			<input
				className="w-full border p-2 rounded"
				placeholder="Descripción"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
		</Modal>
	);
};

export default BudgetFormModal;
