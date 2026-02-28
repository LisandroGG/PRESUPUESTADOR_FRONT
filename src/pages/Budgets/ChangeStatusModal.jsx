import Modal from "@components/Common/Modal.jsx";
import { useEffect, useState } from "react";

const ChangeStatusModal = ({ open, onCancel, onConfirm, initialStatus }) => {
	const allowedTransitions = {
		pending: ["approved"],
		approved: [],
		paid: [],
	};

	const labels = {
		pending: "Pendiente",
		approved: "Confirmado",
		paid: "Saldado",
	};
	const [status, setStatus] = useState("");

	const current = initialStatus?.status;

	useEffect(() => {
		if (open) {
			setStatus(current);
		}
	}, [open, current]);

	const allowed = allowedTransitions[current] || [];

	const isValid = status && status !== current;

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
				<option value={current}>{labels[current]}</option>

				{allowed.map((s) => (
					<option key={s} value={s}>
						{labels[s]}
					</option>
				))}
			</select>
		</Modal>
	);
};

export default ChangeStatusModal;
