import Modal from "@components/Common/Modal.jsx";
import { useEffect, useState } from "react";

const ChangeStatusModal = ({ open, onCancel, onConfirm, initialStatus }) => {
	const [status, setStatus] = useState("");

	useEffect(() => {
		if (open) {
			setStatus(initialStatus?.status);
		}
	}, [initialStatus, open]);

	const isValid = status && status !== initialStatus?.status;

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
