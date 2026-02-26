import Button from "@components/Common/Button.jsx";
import ErrorMessage from "@components/Common/ErrorMessage.jsx";

const Modal = ({
	title,
	confirmText = "Guardar",
	children,
	onCancel,
	onConfirm,
	disabled,
	error,
}) => {
	return (
		<div className="fixed inset-0 z-50 grid place-content-center">
			<button
				type="button"
				className="absolute inset-0 bg-black/40"
				onClick={onCancel}
				aria-label="Cerrar modal"
			/>
			<div className="relative bg-white rounded-lg p-6 w-100">
				<h2 className="text-xl font-bold mb-4">{title}</h2>
				<div className="space-y-4">{children}</div>
				<div className="my-2">{error && <ErrorMessage message={error} />}</div>
				<div className="flex justify-end gap-2">
					<Button variant="ghost" onClick={onCancel}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={onConfirm} disabled={disabled}>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
