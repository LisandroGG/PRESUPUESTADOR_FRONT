const cuitRegex = /^\d{11}$/;
const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

const validateCuit = (cuit) => {
	if (!cuit?.trim()) return "El CUIT es obligatorio";
	if (!cuitRegex.test(cuit)) {
		return "El CUIT debe tener 11 digitos";
	}
};

export const validateClientName = (name) => {
	if (!name?.trim()) return "El nombre es obligatorio";
	if (!nameRegex.test(name.trim())) {
		return "El nombre solo puede contener letras y espacios";
	}
};

export const validateClientData = (name, cuit) => {
	return validateClientName(name) || validateCuit(cuit);
};
