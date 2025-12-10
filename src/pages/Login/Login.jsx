import ErrorMessage from "@components/Common/ErrorMessage.jsx";
import Form from "@components/Common/Form.jsx";
import FormHeader from "@components/Common/FormHeader.jsx";
import Input from "@components/Common/Input.jsx";
import { clearError, loginUser } from "@redux/Slices/usersSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error, isAuthenticated, message } = useSelector(
		(state) => state.user,
	);

	useEffect(() => {
		if (error) toast.error(error);
	}, [error]);

	useEffect(() => {
		if (isAuthenticated) {
			if (message) toast.success(message);
			navigate("/");
		}
	}, [isAuthenticated, navigate, message]);

	const handleChange = () => {
		if (error) dispatch(clearError());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = e.target.user.value;
		const password = e.target.password.value;
		dispatch(loginUser({ user, password }));
	};

	return (
		<div className="min-h-screen grid place-content-center">
			<Form
				onSubmit={handleSubmit}
				submitText={loading ? "Cargando" : "Iniciar Sesión"}
			>
				<FormHeader title="Presupuestador" subtitle="Iniciar Sesión" />
				<Input
					label="Usuario"
					name="user"
					type="text"
					placeholder="Ingrese su usuario"
					autocomplete="email"
					onChange={handleChange}
				/>
				<Input
					label="Contraseña"
					name="password"
					type="password"
					placeholder="Ingrese su contraseña"
					autocomplete="current-password"
					onChange={handleChange}
				/>
				<ErrorMessage message={error} />
			</Form>
		</div>
	);
};

export default Login;
