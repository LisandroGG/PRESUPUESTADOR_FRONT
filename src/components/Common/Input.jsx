import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const Input = ({
	type,
	name,
	placeholder,
	value,
	label,
	onChange,
	autocomplete,
	className = "",
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const inputType = type === "password" && showPassword ? "text" : type;

	return (
		<div className={` ${className}`}>
			{label && (
				<label htmlFor={name} className="">
					{label}
				</label>
			)}
			<input
				id={name}
				name={name}
				type={inputType}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={``}
				{...props}
			/>
			{type === "password" && (
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className=""
					aria-label="Toggle Password Visibility"
				>
					{showPassword ? <EyeOffIcon /> : <EyeIcon />}
				</button>
			)}
		</div>
	);
};

export default Input;
