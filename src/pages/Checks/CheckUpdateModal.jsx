import Modal from "@components/Common/Modal.jsx";
import Input from "@components/common/Input.jsx";
import {
	isDateStructurallyValid,
	validateCheck,
} from "@utils/Validations/paymentValidations.js";
import { useState } from "react";

const checkUpdateModal = ({ open, onCancel, onConfirm }) => {
	const [checkEntity, setCheckEntity] = useState("");
	const [checkExchangeDate, setCheckExchangeDate] = useState("");
	const [error, setError] = useState(null);
	const isValid =
		checkEntity.trim() !== "" && isDateStructurallyValid(checkExchangeDate);

	const clearFields = () => {
		setCheckEntity("");
		setCheckExchangeDate("");
		setError(null);
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = () => {
		const validateError = validateCheck(checkEntity, checkExchangeDate);
		if (validateError) {
			setError(validateError);
			return;
		}
		onConfirm({
			checkEntity: checkEntity.trim(),
			checkExchangeDate,
		});
		clearFields();
	};

	if (!open) return null;

	return (
		<Modal
			title={"Detallar cambio"}
			onCancel={handleCancel}
			onConfirm={handleSubmit}
			disabled={!isValid}
			error={error}
		>
			<Input
				placeholder="Entidad"
				value={checkEntity}
				onChange={(e) => setCheckEntity(e.target.value)}
			/>
			<Input
				type="date"
				value={checkExchangeDate}
				onChange={(e) => setCheckExchangeDate(e.target.value)}
			/>
		</Modal>
	);
};

export default checkUpdateModal;
