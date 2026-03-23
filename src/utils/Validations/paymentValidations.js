const checkEntityRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

const validatePaymentMethod = (method) => {
	if (!method) return "El método de pago es obligatorio";
	return null;
};

const validatePaymentAmount = (amount) => {
	if (amount === null || amount === undefined)
		return "El monto del pago es obligatorio";
	const value = parseFloat(amount);
	if (Number.isNaN(value) || value <= 0)
		return "El monto del pago debe ser un número positivo";
	return null;
};

export const isDateStructurallyValid = (date) => {
	if (!date) return false;

	const parsed = new Date(`${date}T00:00:00`);
	if (Number.isNaN(parsed.getTime())) return false;

	const [y, m, d] = date.split("-").map(Number);

	return (
		parsed.getFullYear() === y &&
		parsed.getMonth() + 1 === m &&
		parsed.getDate() === d
	);
};

const validatePaymentDate = (date) => {
	if (!date) return "La fecha del pago es obligatoria";

	if (!isDateStructurallyValid(date)) {
		return "La fecha del pago no es válida";
	}

	const year = Number(date.slice(0, 4));
	if (year < 2000) {
		return "La fecha del pago es demasiado antigua";
	}

	return null;
};

export const validateCheckEntity = (checkEntity) => {
	if (!checkEntity?.trim()) return "El nombre es obligatorio";
	if (!checkEntityRegex.test(checkEntity.trim())) {
		return "La entidad solo puede contener letras y espacios";
	}
};

export const validatePayment = (method, amount, date) => {
	return (
		validatePaymentMethod(method) ||
		validatePaymentAmount(amount) ||
		validatePaymentDate(date)
	);
};

export const validateCheck = (checkEntity, date) => {
	return validateCheckEntity(checkEntity) || validatePaymentDate(date);
};
