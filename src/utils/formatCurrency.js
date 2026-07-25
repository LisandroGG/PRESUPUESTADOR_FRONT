export const formatCurrency = (value) => {
	return new Intl.NumberFormat("es-AR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(Number(value) || 0);
};