import Button from "@components/Common/Button.jsx";
import ErrorMessage from "@components/Common/ErrorMessage.jsx";

const Modal = ({
	title,
	confirmText = "Guardar",
	buttonVariant = "primary",
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
			<div className="relative bg-white rounded-lg p-6 w-100 animate-fadeIn">
				<h3 className="text-lg font-semibold text-neutral-800 mb-2">{title}</h3>
				<div className="space-y-4">{children}</div>
				{error ? (
					<div className="my-2">
						<ErrorMessage message={error} />
					</div>
				) : (
					""
				)}
				<div className="flex justify-end gap-2 mt-2">
					<Button variant="ghost" onClick={onCancel}>
						Cancelar
					</Button>
					<Button
						variant={buttonVariant}
						onClick={onConfirm}
						disabled={disabled}
					>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
