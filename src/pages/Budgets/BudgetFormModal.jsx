import Button from "@components/Common/Button.jsx";
import { useState } from "react";

const BudgetFormModal = ({ open, onCancel, onConfirm, clients }) => {
	const [clientId, setClientId] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = () => {
		onConfirm({
			clientId: Number(clientId),
			description,
		});

		setClientId("");
		setDescription("");
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-semibold mb-4">Nuevo presupuesto</h3>

				<div className="space-y-4">
					<select
						className="w-full border p-2 rounded"
						value={clientId}
						onChange={(e) => setClientId(e.target.value)}
					>
						<option value="">Seleccione un cliente</option>
						{clients.map((client) => (
							<option key={client.id} value={client.id}>
								{client.name || client.cuit}
							</option>
						))}
					</select>
					<input
						className="w-full border p-2 rounded"
						placeholder="Descripción"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="flex justify-end gap-2 mt-6">
					<Button variant="ghost" onClick={onCancel}>
						Cancelar
					</Button>
					<Button
						variant="primary"
						onClick={handleSubmit}
						disabled={!clientId || !description.trim()}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BudgetFormModal;
