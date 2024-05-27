"use client";
import { Hourglass } from "react-loader-spinner";

function LoadingSpinner() {
	return (
		<Hourglass
			height="60"
			width="60"
			colors={["#3a4750", "#f6c90e"]}
			ariaLabel="hourglass-loading"
			wrapperStyle={{}}
			wrapperClass=""
		/>
	);
}

export default LoadingSpinner;
