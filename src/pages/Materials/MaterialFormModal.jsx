import Button from "@components/Common/Button.jsx";
import { useState } from "react";

const MaterialFormModal = ({
	open,
	mode,
	initialData,
	onCancel,
	onConfirm,
}) => {
	const [name, setName] = useState(initialData?.name);
	const [provider, setProvider] = useState(initialData?.provider);
	const [cost, setCost] = useState(initialData?.cost);

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-semibold mb-4">
					{mode === "create" ? "Nuevo material" : "Editar material"}
				</h3>

				<div className="space-y-4">
					<input
						className="w-full border p-2 rounded"
						placeholder="Nombre"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						className="w-full border p-2 rounded"
						placeholder="Proveedor"
						value={provider}
						onChange={(e) => setProvider(e.target.value)}
					/>
					<input
						className="w-full border p-2 rounded"
						placeholder="Costo"
						value={cost}
						onChange={(e) => setCost(e.target.value)}
					/>
				</div>

				<div className="flex justify-end gap-2 mt-6">
					<Button variant="ghost" onClick={onCancel} className="">
						Cancelar
					</Button>
					<Button
						variant="primary"
						onClick={() => onConfirm({ name, provider, cost })}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MaterialFormModal;
