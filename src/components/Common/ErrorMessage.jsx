const ErrorMessage = ({ message }) => {
	if (!message) return null;

	return <span className="text-red-500 text-sm font-bold">{message}</span>;
};

export default ErrorMessage;
