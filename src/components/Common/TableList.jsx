const TableList = ({
	columns,
	data,
	renderActions,
	emptyMessage = "No hay datos",
}) => {
	if (!data?.length) {
		return (
			<div className="py-10 text-center text-neutral-500">{emptyMessage}</div>
		);
	}

	return (
		<div className="overflow-x-hidden h-158 overflow-y-auto">
			<table className="min-w-full table-fixed border border-neutral-200">
				<thead className="bg-neutral-100">
					<tr className="border-b border-neutral-200 text-sm font-semibold text-neutral-700">
						{columns.map((col) => (
							<th key={col.key} className={`px-4 py-2 text-left ${col.width}`}>
								{col.label}
							</th>
						))}

						{renderActions && (
							<th className="w-[5%] px-4 py-2 text-center">Acciones</th>
						)}
					</tr>
				</thead>

				<tbody>
					{data.map((row) => (
						<tr
							key={row.id}
							className="border-b border-neutral-200 hover:bg-neutral-50"
						>
							{columns.map((col) => (
								<td
									key={col.key}
									className="px-4 py-2 text-neutral-500 text-md"
								>
									{col.render ? col.render(row) : row[col.key]}
								</td>
							))}

							{renderActions && (
								<td className="px-4 py-2">
									<div className="flex items-center justify-center gap-2">
										{renderActions(row)}
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableList;
