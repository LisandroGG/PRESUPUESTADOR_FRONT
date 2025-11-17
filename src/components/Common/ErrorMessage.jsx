const ErrorMessage = ({ message }) => {
	if (!message) return null;

	return <span className="">{message}</span>;
};

export default ErrorMessage;
