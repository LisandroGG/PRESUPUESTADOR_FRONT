const FormHeader = ({ title, subtitle }) => {
	return (
		<div className="flex flex-col items-center gap-4 m-4">
			<div className="w-full items-center flex flex-col">
				<img
					src="assets/img/logo.webp"
					alt="Logo"
					className="w-28 h-28 mb-2 rounded-full"
				/>
				<h1 className="font-semibold text-xl text-neutral-800">{title}</h1>
				<h2 className="font-normal text-sm text-neutral-500">{subtitle}</h2>
			</div>
		</div>
	);
};

export default FormHeader;
