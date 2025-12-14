import Loading from "@components/Common/Loading.jsx";
import Pagination from "@components/Common/Pagination.jsx";
import usePagination from "@hooks/usePagination.js";
import { getAllClients } from "@redux/Slices/clientSlice";
import { formatCuit } from "@utils/formatCuit.js";
import { useSelector } from "react-redux";

const ClientsList = () => {
	const { clients } = useSelector((state) => state.clients);

	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.clients, getAllClients);

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando"} />
			</div>
		);
	}
	return (
		<div>
			<h1>Cientes</h1>
			<ul>
				{clients.map((client) => (
					<li key={client.id}>
						{client.name ?? "No registrado"} - {formatCuit(client.cuit)}
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
