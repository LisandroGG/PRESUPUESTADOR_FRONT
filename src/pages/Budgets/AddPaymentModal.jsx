import Button from "@components/Common/Button.jsx";
import { useState } from "react";

const AddPaymentModal = ({ open, onCancel, onConfirm }) => {
	const [method, setMethod] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState("");

	const handleSubmit = () => {
		onConfirm({
			method,
			amount: Number(amount),
			date,
		});
		setMethod("");
		setAmount("");
		setDate("");
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-semibold mb-4">Agregar pago</h3>
				<div className="space-y-4">
					<input
						type="text"
						className="w-full border p-2 rounded"
						placeholder="Método de pago"
						onChange={(e) => setMethod(e.target.value)}
					/>
					<input
						type="number"
						className="w-full border p-2 rounded"
						placeholder="Monto del pago"
						onChange={(e) => setAmount(e.target.value)}
					/>
					<input
						type="date"
						className="w-full border p-2 rounded"
						onChange={(e) => setDate(e.target.value)}
					/>
					<div className="flex justify-end gap-2 mt-6">
						<Button variant="ghost" onClick={onCancel}>
							Cancelar
						</Button>
						<Button variant="primary" onClick={handleSubmit}>
							Agregar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPaymentModal;
