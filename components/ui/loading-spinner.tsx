"use client";
import { Hourglass } from "react-loader-spinner";

import classes from "./loading-spinner.module.css";

function LoadingSpinner() {
	return (
		<div className={classes.container}>
			<Hourglass
				height="60"
				width="60"
				colors={["#3a4750", "#f6c90e"]}
				ariaLabel="hourglass-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</div>
	);
}

export default LoadingSpinner;
