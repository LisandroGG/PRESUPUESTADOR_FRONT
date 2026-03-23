import Button from "@components/Common/Button.jsx";
import { Funnel, FunnelX, Search, SquarePlus } from "lucide-react";

const SectionList = ({
	title,
	list,
	onAdd,
	onSearch,
	onClearSearch,
	children,
}) => {
	return (
		<section className="bg-white rounded-xl border border-neutral-200 shadow-md p-6 min-h-full grid grid_rows-[100px_1fr_100px]">
			<div className="flex justify-between items-center mb-6 animate-fadeIn">
				<h2 className="text-xl font-semibold">{title}:</h2>
				<div className="flex gap-2">
					<Button
						variant="primary"
						className="flex items-center gap-2"
						onClick={onSearch}
						title={`Buscar ${list}`}
					>
						{onClearSearch ? (
							<>
								<Funnel size={18} />
								Filtrar
							</>
						) : (
							<>
								<Search size={18} />
								Buscar
							</>
						)}
					</Button>
					{onClearSearch && (
						<Button
							variant="primary"
							className="flex items-center gap-2"
							onClick={onClearSearch}
							title="Limpiar filtros"
						>
							<FunnelX size={18} />
							Limpiar
						</Button>
					)}
					{onAdd ? (
						<Button
							variant="primary"
							className="flex items-center gap-2"
							onClick={onAdd}
							title={`Nuevo ${list}`}
						>
							<SquarePlus size={16} />
							Nuevo {list}
						</Button>
					) : null}
				</div>
			</div>
			{children}
		</section>
	);
};

export default SectionList;
