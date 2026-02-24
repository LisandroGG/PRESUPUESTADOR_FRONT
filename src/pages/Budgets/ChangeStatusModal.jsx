import Modal from "@components/Common/Modal.jsx";
import { useState } from "react";

const ChangeStatusModal = ({ open, onCancel, onConfirm, initialStatus }) => {
	const [status, setStatus] = useState(initialStatus?.status);

	const isValid = status && status !== initialStatus.status;

	const handleSubmit = () => {
		onConfirm(status);
		setStatus("");
	};

	if (!open) return null;
	return (
		<Modal
			title={"Cambiar estado del presupuesto"}
			onCancel={onCancel}
			onConfirm={handleSubmit}
			disabled={!isValid}
		>
			<select
				className="w-full border p-2 rounded"
				value={status}
				onChange={(e) => setStatus(e.target.value)}
			>
				<option value="pending">Pendiente</option>
				<option value="approved">Confirmado</option>
				<option value="paid">Saldado</option>
			</select>
		</Modal>
	);
};

export default ChangeStatusModal;
