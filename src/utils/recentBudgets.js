export const saveRecentBudget = (budgetId) => {
	if (!budgetId) return;

	const stored = JSON.parse(localStorage.getItem("recentBudgets")) || [];

	const updated = [budgetId, ...stored.filter((id) => id !== budgetId)].slice(
		0,
		5,
	);

	localStorage.setItem("recentBudgets", JSON.stringify(updated));
};
