import Button from "@components/Common/Button.jsx";
import { useState } from "react";

const ProductMaterialsFormModal = ({
	open,
	onCancel,
	onConfirm,
	materials,
}) => {
	const [materialId, setMaterialId] = useState("");
	const [quantity, setQuantity] = useState("");

	const handleSubmit = () => {
		onConfirm({
			materialId: Number(materialId),
			quantity: Number(quantity),
		});

		setMaterialId("");
		setQuantity("");
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 grid place-content-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h3 className="text-lg font-semibold mb-4">Agregar material</h3>

				<div className="space-y-4">
					<select
						className="w-full border p-2 rounded"
						value={materialId}
						onChange={(e) => setMaterialId(e.target.value)}
					>
						<option value="">Seleccione un material</option>
						{materials?.map((mat) => (
							<option key={mat.id} value={mat.id}>
								{mat.name}
							</option>
						))}
					</select>

					<input
						type="number"
						min="1"
						className="w-full border p-2 rounded"
						placeholder="Cantidad"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>

				<div className="flex justify-end gap-2 mt-6">
					<Button variant="ghost" onClick={onCancel}>
						Cancelar
					</Button>
					<Button
						variant="primary"
						onClick={handleSubmit}
						disabled={!materialId || !quantity}
					>
						Guardar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductMaterialsFormModal;
