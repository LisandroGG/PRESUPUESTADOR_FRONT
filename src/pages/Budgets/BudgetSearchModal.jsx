import Modal from "@components/Common/Modal.jsx";
import { validateBudgetClient } from "@utils/validations/budgetValidations.js";
import { useState } from "react";

const BudgetSearchModal = ({ open, onCancel, onConfirm, clients }) => {
	const [clientId, setClientId] = useState("");
	const [status, setStatus] = useState("");
	const [error, setError] = useState(null);
	const isValid = status !== "" || clientId !== "";

	const clearFields = () => {
		setClientId("");
		setStatus("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		setError("");
		if (clientId) {
			const cliendError = validateBudgetClient(clientId);
			if (cliendError) {
				setError(cliendError);
				return;
			}
		}
		onConfirm({
			clientId: Number(clientId) || undefined,
			status: status.trim() || undefined,
		});
	};

	if (!open) return null;

	return (
		<Modal
			title="Buscar presupuesto"
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			confirmText={"Buscar"}
			error={error}
			disabled={!isValid}
		>
			<select
				className="w-full border p-2 rounded outline-none focus:border-primary-500 focus:border-2"
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
			<select
				className="w-full border p-2 rounded outline-none focus:border-primary-500 focus:border-2"
				value={status}
				onChange={(e) => setStatus(e.target.value)}
			>
				<option value="">Seleccione un estado</option>
				<option value="pending">Pendiente</option>
				<option value="approved">Confirmado</option>
				<option value="paid">Saldado</option>
			</select>
		</Modal>
	);
};

export default BudgetSearchModal;
