import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useCrudDispatch = () => {
	const dispatch = useDispatch();

	const run = async (action, payload) => {
		try {
			const result = await dispatch(action(payload)).unwrap();

			if (result?.message) {
				toast.success(result.message);
			}

			return result;
		} catch (error) {
			toast.error(error || "Ocurrió un error");
			throw error;
		}
	};

	return { run };
};

export default useCrudDispatch;
