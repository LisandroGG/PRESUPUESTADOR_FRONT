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

	const autoCompleteValue =
		autocomplete ||
		(type === "password"
			? "current-password"
			: type === "email"
				? "email"
				: "off");

	return (
		<div className="relative">
			{label && (
				<label htmlFor={name} className="block text-md font-semibold text-gray-500 my-2">
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
				autoComplete={autoCompleteValue}
				className={`text-lg focus:outline-none focus:border-gray-300 font-semibold border-gray-200 border-2 rounded-md p-2 ${type === "password" ? "pr-11" : ""} w-full text-gray-500 ${className}`}
				{...props}
			/>
			{type === "password" && (
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute top-1/3.5 right-3 transform translate-y-1/2 text-gray-400"
					aria-label="Toggle Password Visibility"
				>
					{showPassword ? <EyeOffIcon className="w-6 h-6 cursor-pointer"/> : <EyeIcon className="w-6 h-6 cursor-pointer"/>}
				</button>
			)}
		</div>
	);
};

export default Input;
