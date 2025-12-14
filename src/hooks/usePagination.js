import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePagination = (selector, fetchAction) => {
	const dispatch = useDispatch();
	const { page, totalPages, hasNext, hasPrev, loading } = useSelector(selector);

	useEffect(() => {
		dispatch(fetchAction({ page }));
	}, [dispatch, fetchAction, page]);

	const goToPage = (newPage) => {
		if (newPage < 1 || newPage > totalPages) return;
		dispatch(fetchAction({ page: newPage }));
	};

	const next = () => {
		if (hasNext) {
			dispatch(fetchAction({ page: page + 1 }));
		}
	};

	const prev = () => {
		if (hasPrev) {
			dispatch(fetchAction({ page: page - 1 }));
		}
	};

	return {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		next,
		prev,
	};
};

export default usePagination;
