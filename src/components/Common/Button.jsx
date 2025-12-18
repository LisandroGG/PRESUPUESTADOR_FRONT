const Button = ({
	children,
	variant = "primary",
	disabled = false,
	className = "",
	...props
}) => {
	const base =
		"cursor-pointer font-chivo text-md font-semibold p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-400";

	const variants = {
		primary:
			"text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700 hover:scale-105",
		danger: "text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600",
		ghost: "text-primary-500 hover:text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500",
		pagination:
			"text-neutral-600 border hover:bg-neutral-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed",
	};

	const disabledStyles = disabled
		? "opacity-40 cursor-not-allowed hover:scale-100"
		: "";

	return (
		<button
			disabled={disabled}
			className={`${base} ${variants[variant]} ${disabledStyles} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
