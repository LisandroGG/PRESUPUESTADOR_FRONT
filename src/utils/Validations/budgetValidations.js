const budgetDescriptionRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/;
const budgetProductQuantityRegex = /^\d+$/;

const validateBudgetDescription = (description) => {
	if (!description?.trim()) return "La descripción es obligatoria";
	if (!budgetDescriptionRegex.test(description.trim())) {
		return "La descripción solo puede contener letras, números, espacios y los caracteres especiales: . , _ -";
	}
};

const validateBudgetClient = (clientId) => {
	if (!clientId) return "Debe seleccionar un cliente";
	return null;
};

const validateBuggetProductId = (productId) => {
	if (!productId) return "Debe seleccionar un producto";
	return null;
};

const validateBudgetProductQuantity = (quantity) => {
	if (quantity === null || quantity === undefined || quantity === "")
		return "La cantidad es obligatoria";
	if (!budgetProductQuantityRegex.test(quantity)) {
		return "La cantidad debe ser un número entero mayor a 0";
	}

	const value = Number(quantity);
	if (value <= 0) {
		return "La cantidad debe ser mayor a 0";
	}
};

export const validateBudgetProduct = (productId, quantity) => {
	return (
		validateBuggetProductId(productId) ||
		validateBudgetProductQuantity(quantity)
	);
};

export const validateBudget = (clientId, description) => {
	return (
		validateBudgetClient(clientId) || validateBudgetDescription(description)
	);
};
