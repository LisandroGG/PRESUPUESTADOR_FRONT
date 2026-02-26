const productNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/;
const productDescriptionRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/;
const productMaterialQuantityRegex = /^\d+$/;

export const validateProductName = (name) => {
	if (!name?.trim()) return "El nombre es obligatorio";
	if (!productNameRegex.test(name.trim())) {
		return "El nombre solo puede contener letras, números, espacios y los caracteres especiales: . , _ -";
	}
};

const validateProductDescription = (description) => {
	if (!description?.trim()) return "La descripción es obligatoria";
	if (!productDescriptionRegex.test(description.trim())) {
		return "La descripción solo puede contener letras, números, espacios y los caracteres especiales: . , _ -";
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
