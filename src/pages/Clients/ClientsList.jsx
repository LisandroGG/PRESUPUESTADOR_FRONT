import Pagination from "@components/Common/Pagination.jsx";
import usePagination from "@hooks/usePagination.js";
import { getAllClients } from "@redux/Slices/clientSlice";
import { useSelector } from "react-redux";

const ClientsList = () => {
	const { clients } = useSelector((state) => state.clients);

	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.clients, getAllClients);

	if (loading) return <p>Cargando...</p>;
	return (
		<div>
			<h1>Cientes</h1>
			<ul>
				{clients.map((client) => (
					<li key={client.id}>
						{client.name} - {client.cuit}
					</li>
				))}
			</ul>
			<Pagination
				page={page}
				totalPages={totalPages}
				hasPrev={hasPrev}
				hasNext={hasNext}
				onPageChange={goToPage}
			/>
		</div>
	);
};

export default ClientsList;
