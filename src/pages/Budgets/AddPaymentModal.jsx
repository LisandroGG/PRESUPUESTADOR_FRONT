import Modal from "@components/Common/Modal.jsx";
import {
	isDateStructurallyValid,
	validatePayment,
} from "@utils/Validations/paymentValidations.js";
import { useState } from "react";

const AddPaymentModal = ({ open, onCancel, onConfirm }) => {
	const [method, setMethod] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState("");
	const [error, setError] = useState(null);
	const isValid =
		method.trim() !== "" && amount !== "" && isDateStructurallyValid(date);
	const methods = [
		"Efectivo",
		"Tarjeta de crédito",
		"Transferencia bancaria",
		"Cheque",
		"Otro",
	];

	const clearFields = () => {
		setMethod("");
		setAmount("");
		setDate("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		const validateError = validatePayment(method, amount, date);
		if (validateError) {
			setError(validateError);
			return;
		}
		onConfirm({
			method: method.trim(),
			amount: Number(amount),
			date,
		});
		clearFields();
	};

	if (!open) return null;

	return (
		<Modal
			title={"Agregar pago"}
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			disabled={!isValid}
			error={error}
		>
			<select
				className="w-full border p-2 rounded"
				value={method}
				onChange={(e) => setMethod(e.target.value)}
			>
				<option value="">Seleccionar método de pago</option>
				{methods.map((m) => (
					<option key={m} value={m}>
						{m}
					</option>
				))}
			</select>
			<input
				type="number"
				value={amount}
				className="w-full border p-2 rounded"
				placeholder="Monto del pago"
				onChange={(e) => setAmount(e.target.value)}
			/>
			<input
				type="date"
				value={date}
				className="w-full border p-2 rounded"
				onChange={(e) => setDate(e.target.value)}
			/>
		</Modal>
	);
};

export default AddPaymentModal;
