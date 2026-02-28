import Modal from "@components/Common/Modal.jsx";

const ChangeStatusModal = ({ open, onCancel, onConfirm }) => {
	if (!open) return null;

	return (
		<Modal
			title={"Cambiar estado del presupuesto"}
			onCancel={onCancel}
			onConfirm={onConfirm}
			confirmText={"Cambiar"}
		>
			<p className="mt-2 text-sm text-neutral-600">
				Este presupuesto cambiara su estado de <strong>pendiente</strong> a{" "}
				<strong>confirmado</strong>
			</p>
		</Modal>
	);
};

export default ChangeStatusModal;
