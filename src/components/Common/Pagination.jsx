const Pagination = ({ page, totalPages, hasNext, hasPrev, onPageChange }) => {
	if (totalPages <= 1) return null;

	return (
		<div>
			<button
				type="button"
				disabled={!hasPrev}
				onClick={() => onPageChange(page - 1)}
			>
				Anterior
			</button>
			<span>
				Pagina {page} de {totalPages}
			</span>
			<button
				type="button"
				disabled={!hasNext}
				onClick={() => onPageChange(page + 1)}
			>
				Siguiente
			</button>
		</div>
	);
};

export default Pagination;
