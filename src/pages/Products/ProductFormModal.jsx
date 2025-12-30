import Button from "@components/Common/Button.jsx";
import { useState } from "react";

const ProductFormModal = ({ open, onCancel, onConfirm, initialData }) => {
	const [name, setName] = useState(initialData?.name);
	const [description, setDescription] = useState(initialData?.description);

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-semibold mb-4">Nuevo producto</h3>

				<div className="space-y-4">
					<input
						className="w-full border p-2 rounded"
						placeholder="Nombre"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						className="w-full border p-2 rounded"
						placeholder="Descripción"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="flex justify-end gap-2 mt-6">
					<Button variant="ghost" onClick={onCancel} className="">
						Cancelar
					</Button>
					<Button
						variant="primary"
						onClick={() => onConfirm({ name, description })}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductFormModal;
