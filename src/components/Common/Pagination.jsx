import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, hasNext, hasPrev, onPageChange }) => {
	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-center gap-1 mt-6">
			<button
				type="button"
				disabled={!hasPrev}
				onClick={() => onPageChange(page - 1)}
				className="flex items-center justify-center w-9 h-9 rounded-md border text-sm
					hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
			>
				<ChevronLeft size={24} />
			</button>
			<span className="font-bold">
				{page} de {totalPages}
			</span>
			<button
				type="button"
				disabled={!hasNext}
				onClick={() => onPageChange(page + 1)}
				className="flex items-center justify-center w-9 h-9 rounded-md border text-sm
					hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
			>
				<ChevronRight size={24} />
			</button>
		</div>
	);
};

export default Pagination;
