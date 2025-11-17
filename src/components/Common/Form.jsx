const Form = ({ children, onSubmit, className = "", title, submitText }) => {
	return (
		<form onSubmit={onSubmit} className={` ${className}`}>
			{title && <h1 className="">{title}</h1>}
			{children}
			<button type="submit" className="">
				{submitText}
			</button>
		</form>
	);
};

export default Form;
