import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePagination = (selector, fetchAction) => {
	const dispatch = useDispatch();
	const { page, totalPages, hasNext, hasPrev, loading } = useSelector(selector);

	const [filters, setFilters] = useState({});

	useEffect(() => {
		dispatch(fetchAction({ page, ...filters }));
	}, [dispatch, fetchAction, page, filters]);

	const goToPage = useCallback(
		(newPage) => {
			if (newPage < 1 || newPage > totalPages) return;
			dispatch(fetchAction({ page: newPage, ...filters }));
		},
		[dispatch, fetchAction, totalPages, filters],
	);

	const next = useCallback(() => {
		if (hasNext) {
			dispatch(fetchAction({ page: page + 1, ...filters }));
		}
	}, [dispatch, fetchAction, hasNext, page, filters]);

	const prev = useCallback(() => {
		if (hasPrev) {
			dispatch(fetchAction({ page: page - 1, ...filters }));
		}
	}, [dispatch, fetchAction, hasPrev, page, filters]);

	const applyFilters = useCallback((newFilters) => {
		setFilters(newFilters || {});
	}, []);

	const clearFilters = useCallback(() => {
		setFilters({});
	}, []);

	return {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		next,
		prev,
		applyFilters,
		clearFilters,
		filters,
	};
};

export default usePagination;
