const ErrorMessage = ({ message }) => {
	if (!message) return null;

	return <span className="text-red-500 text-sm pb-1 font-bold">{message}</span>;
};

export default ErrorMessage;
