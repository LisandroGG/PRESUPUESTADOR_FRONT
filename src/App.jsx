import Layout from "@components/Layout/Layout.jsx";
import Login from "@components/Login/Login.jsx";
import PrivateRoute from "@components/Routes/PrivateRoute.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="min-h-screen">
			<Toaster position="top-center" />
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route element={<PrivateRoute />}>
						<Route path="/" element={<Layout />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
