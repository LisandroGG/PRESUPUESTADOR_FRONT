import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { getSession } from "@redux/Slices/usersSlice.js";
import { store } from "@redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";

store.dispatch(getSession());

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
