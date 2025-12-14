const Loading = ({ loadingText }) => {
	return (
		<div className="flex flex-col items-center">
			<img src="" alt="Loading" className="w-28" />
			<p>{loadingText}</p>
		</div>
	);
};

export default Loading;
