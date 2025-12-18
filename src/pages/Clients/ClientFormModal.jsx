import Button from "@components/Common/Button.jsx";
import { useState } from "react";

const ClientFormModal = ({ open, mode, initialData, onCancel, onConfirm }) => {
	const [name, setName] = useState(initialData?.name || "");
	const [cuit, setCuit] = useState(initialData?.cuit || "");

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-semibold mb-4">
					{mode === "create" ? "Nuevo cliente" : "Editar cliente"}
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
						placeholder="CUIT"
						value={cuit}
						onChange={(e) => setCuit(e.target.value)}
					/>
				</div>

				<div className="flex justify-end gap-2 mt-6">
					<Button variant="ghost" onClick={onCancel} className="">
						Cancelar
					</Button>
					<Button variant="primary" onClick={() => onConfirm({ name, cuit })}>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ClientFormModal;
