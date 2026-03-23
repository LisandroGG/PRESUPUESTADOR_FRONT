import Modal from "@components/Common/Modal.jsx";
import Input from "@components/common/Input.jsx";
import { validateCheckEntity } from "@utils/validations/paymentValidations.js";
import { useState } from "react";

const CheckSearchModal = ({ open, onCancel, onConfirm }) => {
	const [checkEntity, setCheckEntity] = useState("");
	const [exchanged, setExchanged] = useState();
	const [error, setError] = useState(null);
	const isValid = checkEntity.trim() !== "" || exchanged !== "";

	const clearFields = () => {
		setCheckEntity("");
		setExchanged("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		setError(null);
		if (checkEntity.trim()) {
			const entityError = validateCheckEntity(checkEntity);
			if (entityError) {
				setError(entityError);
				return;
			}
		}
		onConfirm({
			checkEntity: checkEntity.trim() || undefined,
			exchanged: exchanged || undefined,
		});
	};

	if (!open) return null;

	return (
		<Modal
			title="Buscar cheques"
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			confirmText={"Buscar"}
			error={error}
			disabled={!isValid}
		>
			<Input
				placeholder="Entidad"
				value={checkEntity}
				onChange={(e) => setCheckEntity(e.target.value)}
			/>
			<select
				className="w-full border p-2 rounded outline-none focus:border-primary-500 focus:border-2"
				value={exchanged}
				onChange={(e) => setExchanged(e.target.value)}
			>
				<option value="">Seleccione un estado</option>
				<option value="false">Pendiente de cambio</option>
				<option value="true">Cambiado realizado</option>
			</select>
		</Modal>
	);
};

export default CheckSearchModal;
