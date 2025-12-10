import { Outlet } from "react-router-dom";
import Nav from "@components/Nav/Nav.jsx";
import Footer from "@components/Footer/Footer.jsx";

const MainLayout = () => {
	return(
		<div className="min-h-screen flex flex-col">
			<Nav />
			<main className="flex-1 p-4">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
};

export default MainLayout;