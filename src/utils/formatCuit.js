export const formatCuit = (cuit) => {
	if (!cuit) return "No registrado";

	const clean = cuit.replace(/\D/g, "");

	if (clean.length !== 11) return cuit;

	return `${clean.slice(0, 2)}-${clean.slice(2, 10)}-${clean.slice(10)}`;
};
