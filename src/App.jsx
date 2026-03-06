//COMPONENTS
import MainLayout from "@components/Layout/MainLayout.jsx";
import BudgetDetail from "@pages/Budgets/BudgetDetail.jsx";
//PAGES
import BudgetsList from "@pages/Budgets/BudgetsList.jsx";
import ClientList from "@pages/Clients/ClientsList.jsx";
import Home from "@pages/Home/Home.jsx";
import MaterialsList from "@pages/Materials/MaterialsList.jsx";
import ProductDetail from "@pages/Products/ProductDetail.jsx";
import ProductsList from "@pages/Products/ProductsList.jsx";
import { Toaster } from "react-hot-toast";
import { HashRouter, Route, Routes } from "react-router-dom";

//ROUTES

function App() {
	return (
		<div className="min-h-screen font-chivo bg-neutral-100">
			<Toaster position="top-center" />

			<HashRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route index element={<Home />} />

						<Route path="budgets" element={<BudgetsList />} />
						<Route path="budgets/:id" element={<BudgetDetail />} />

						<Route path="clients" element={<ClientList />} />

						<Route path="products" element={<ProductsList />} />
						<Route path="products/:id" element={<ProductDetail />} />

						<Route path="materials" element={<MaterialsList />} />
					</Route>

					{/* 404 */}
					<Route path="*" element={<h1>Página no encontrada</h1>} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
