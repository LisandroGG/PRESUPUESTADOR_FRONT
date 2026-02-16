import Button from "@components/Common/Button.jsx";
import { useState } from "react";

const ChangeStatusModal = ({ open, onCancel, onConfirm, initialStatus }) => {
	const [status, setStatus] = useState(initialStatus?.status);

	const handleSubmit = () => {
		onConfirm(status);
		setStatus("");
	};

	if (!open) return null;
	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-semibold mb-4">
					Cambiar estado del presupuesto
				</h3>
				<div className="space-y-4">
					<select
						className="w-full border p-2 rounded"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="pending">Pendiente</option>
						<option value="approved">Confirmado</option>
						<option value="paid">Saldado</option>
					</select>
				</div>
				<div className="flex justify-end gap-2 mt-6">
					<Button variant="ghost" onClick={onCancel}>
						Cancelar
					</Button>
					<Button
						variant="primary"
						onClick={handleSubmit}
						disabled={!status || status === initialStatus.status}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChangeStatusModal;
