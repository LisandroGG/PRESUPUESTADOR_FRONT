import Button from "@components/Common/Button";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

const Pagination = ({ page, totalPages, hasNext, hasPrev, onPageChange }) => {
	return (
		<div className="flex items-center justify-center gap-1 mt-6">
			<Button
				variant="pagination"
				disabled={!hasPrev}
				onClick={() => onPageChange(1)}
				aria-label="Primera página"
			>
				<ChevronsLeft size={14} />
			</Button>
			<Button
				variant="pagination"
				disabled={page === 1}
				onClick={() => onPageChange(page - 1)}
				aria-label="Anterior página"
			>
				<ChevronLeft size={14} />
			</Button>
			<span className="font-semibold text-sm mx-2 text-neutral-600">
				<span className="text-primary-500">{page}</span> de {totalPages}
			</span>
			<Button
				variant="pagination"
				disabled={!hasNext}
				onClick={() => onPageChange(page + 1)}
				aria-label="Proxima página"
			>
				<ChevronRight size={14} />
			</Button>
			<Button
				variant="pagination"
				disabled={!hasNext}
				onClick={() => onPageChange(totalPages)}
				aria-label="Ultima página"
			>
				<ChevronsRight size={14} />
			</Button>
		</div>
	);
};

export default Pagination;
