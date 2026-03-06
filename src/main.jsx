import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { getSession } from "@redux/Slices/usersSlice.js";
import { store } from "@redux/store.js";
import { Provider, useSelector } from "react-redux";
import App from "./App.jsx";

store.dispatch(getSession());

function Root() {
	const { loading } = useSelector((state) => state.user);

	if (loading) {
		return (
			<div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-50">
				<div className="h-15 w-15 border-4 border-neutral-300 border-t-primary-500 rounded-full animate-spin"></div>

				<p className="mt-4 text-neutral-600 text-lg font-medium">
					Cargando sistema...
				</p>
			</div>
		);
	}

	return <App />;
}

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<Root />
		</Provider>
	</StrictMode>,
);
