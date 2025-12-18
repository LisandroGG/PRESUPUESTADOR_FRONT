import Button from "@components/Common/Button.jsx";

const ConfirmModal = ({
	title = "Confirmar acción",
	description,
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	onConfirm,
	onCancel,
	loading = false,
}) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<button
				type="button"
				className="absolute inset-0 bg-black/40"
				onClick={onCancel}
				aria-label="Cerrar modal"
			/>

			<div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
				<h3 className="text-lg font-semibold text-neutral-800">{title}</h3>

				{description && (
					<p className="mt-2 text-sm text-neutral-600">{description}</p>
				)}

				<div className="mt-6 flex justify-end gap-3">
					<Button variant="ghost" onClick={onCancel} disabled={loading}>
						{cancelText}
					</Button>

					<Button variant="danger" onClick={onConfirm} disabled={loading}>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
