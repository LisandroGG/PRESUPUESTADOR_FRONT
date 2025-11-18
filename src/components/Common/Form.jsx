const Form = ({ children, onSubmit, className = "", title, submitText }) => {
	return (
		<form
			method="post"
			onSubmit={onSubmit}
			className={`bg-white flex flex-col gap-4 border-gray-200 border-2 p-4 rounded-lg shadow-2xl w-sm md:w-md ${className}`}
		>
			{title && <h1 className="">{title}</h1>}
			{children}
			<button
				type="submit"
				className="cursor-pointer text-white bg-gray-500 text-xl font-semibold p-2 rounded-3xl hover:bg-gray-600 transition-all my-4"
			>
				{submitText}
			</button>
		</form>
	);
};

export default Form;
