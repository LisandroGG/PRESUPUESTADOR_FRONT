import Modal from "@components/Common/Modal.jsx";

const ConfirmModal = ({ open, title, description, onConfirm, onCancel }) => {
	if (!open) return null;
	return (
		<Modal
			title={title}
			onCancel={onCancel}
			onConfirm={onConfirm}
			confirmText={"Confirmar"}
			buttonVariant={"danger"}
		>
			{description && <p className="text-sm text-neutral-600">{description}</p>}
		</Modal>
	);
};

export default ConfirmModal;
