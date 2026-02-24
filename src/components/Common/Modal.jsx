import Button from "@components/Common/Button.jsx";
import ErrorMessage from "@components/Common/ErrorMessage.jsx";

const Modal = ({ title, children, onCancel, onConfirm, disabled, error }) => {
	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">{title}</h2>
				<div className="space-y-4">{children}</div>
				<div className="my-2">{error && <ErrorMessage message={error} />}</div>
				<div className="flex justify-end gap-2">
					<Button variant="ghost" onClick={onCancel}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={onConfirm} disabled={disabled}>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
