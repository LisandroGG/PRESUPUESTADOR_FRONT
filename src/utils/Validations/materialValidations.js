const materialNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/;
const materialProviderRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

const validateMaterialName = (name) => {
	if (!name?.trim()) return "El nombre es obligatorio";
	if (!materialNameRegex.test(name.trim())) {
		return "El nombre solo puede contener letras, números, espacios y los caracteres especiales: . , _ -";
	}
};

const validateMaterialProvider = (provider) => {
	if (!provider?.trim()) return "El proveedor es obligatorio";
	if (!materialProviderRegex.test(provider.trim())) {
		return "El proveedor solo puede contener letras y espacios.";
	}
};

const validateMaterialCost = (cost) => {
	if (cost === null || cost === undefined || cost === "")
		return "El costo es obligatorio";
	const value = parseFloat(cost);
	if (Number.isNaN(value) || value <= 0) {
		return "El costo debe ser numérico y mayor a 0.";
	}
};

export const validateMaterial = (name, provider, cost) => {
	return (
		validateMaterialName(name) ||
		validateMaterialProvider(provider) ||
		validateMaterialCost(cost)
	);
};
