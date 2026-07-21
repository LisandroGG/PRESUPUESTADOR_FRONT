const productNameRegex = /^[\p{L}\p{N}\p{P}\p{S}\s]+$/u;
const productDescriptionRegex = /^[\p{L}\p{N}\p{P}\p{S}\s]+$/u;
const productMaterialQuantityRegex = /^\d+$/;

export const validateProductName = (name) => {
	if (!name?.trim()) return "El nombre es obligatorio";
	if (!productNameRegex.test(name.trim())) {
		return "El nombre contiene caracteres no válidos.";
	}
};

const validateProductDescription = (description) => {
	if (!description?.trim()) return "La descripción es obligatoria";
	if (!productDescriptionRegex.test(description.trim())) {
		return "La descripción contiene caracteres no válidos.";
	}
};

const validateProductMaterialId = (materialId) => {
	if (!materialId) return "Debe seleccionar un material";
	return null;
};

const validateProductMaterialQuantity = (quantity) => {
	if (quantity === null || quantity === undefined || quantity === "")
		return "La cantidad es obligatoria";
	if (!productMaterialQuantityRegex.test(quantity)) {
		return "La cantidad debe ser un número entero mayor a 0";
	}

	const value = Number(quantity);
	if (value <= 0) {
		return "La cantidad debe ser mayor a 0";
	}
};

export const validateProductMaterial = (materialId, quantity) => {
	return (
		validateProductMaterialId(materialId) ||
		validateProductMaterialQuantity(quantity)
	);
};

export const validateProduct = (name, description) => {
	return validateProductName(name) || validateProductDescription(description);
};
