//COMPONENTS
import MainLayout from "@components/Layout/MainLayout.jsx";
import BudgetDetail from "@pages/Budgets/BudgetDetail.jsx";
//PAGES
import BudgetsList from "@pages/Budgets/BudgetsList.jsx";
import ClientList from "@pages/Clients/ClientsList.jsx";
import Home from "@pages/Home/Home.jsx";
import Login from "@pages/Login/Login.jsx";
import MaterialsList from "@pages/Materials/MaterialsList.jsx";
import ProductsList from "@pages/Products/ProductsList.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//ROUTES
import PrivateRoute from "../src/Routes/PrivateRoute.jsx";

function App() {
	return (
		<div className="min-h-screen font-chivo">
			<Toaster position="top-center" />

			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />

					<Route element={<PrivateRoute />}>
						<Route element={<MainLayout />}>
							<Route index element={<Home />} />

							<Route path="budgets" element={<BudgetsList />} />
							<Route path="budgets/:id" element={<BudgetDetail />} />

							<Route path="clients" element={<ClientList />} />

							<Route path="products" element={<ProductsList />} />

							<Route path="materials" element={<MaterialsList />} />
						</Route>
					</Route>

					{/* 404 */}
					<Route path="*" element={<h1>Página no encontrada</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
