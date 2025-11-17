const FormHeader = ({ title, subtitle }) => {
	return (
		<div className="flex flex-col items-center gap-4 m-4">
			<div className="w-full text-center grid gap-1 ">
				<h1 className="font-bold text-2xl text-gray-700">{title}</h1>
				<h2 className="font-medium text-lg text-gray-500">{subtitle}</h2>
			</div>
		</div>
	);
};

export default FormHeader;
