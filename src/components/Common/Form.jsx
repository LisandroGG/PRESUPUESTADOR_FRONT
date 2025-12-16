import Button from "@components/Common/Button.jsx";

const Form = ({ children, onSubmit, className = "", title, submitText }) => {
	return (
		<form
			method="post"
			onSubmit={onSubmit}
			className={`bg-white flex flex-col gap-4 border-neutral-200 border-2 p-4 rounded-lg shadow-xl w-md ${className}`}
		>
			{title && <h1 className="">{title}</h1>}
			{children}
			<Button variant="primary" type="submit" className="hover:scaz|le-100">
				{submitText}
			</Button>
		</form>
	);
};

export default Form;
