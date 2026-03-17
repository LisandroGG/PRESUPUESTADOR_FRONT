const Input = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	className = "",
	...props
}) => {
	return (
		<div className="relative">
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`w-full text-neutral-600 border p-2 rounded outline-none focus:border-primary-500 focus:border-2 ${className}`}
				{...props}
			/>
		</div>
	);
};

export default Input;
