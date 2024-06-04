"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import classes from "./home-page-controls.module.css";

const HomePageControls: React.FC<{ numberOfItems: number }> = ({
	numberOfItems,
}) => {
	const params = useSearchParams();
	const query = params.get("p");

	const router = useRouter();

	let maxPage: number;
	if (numberOfItems % 4 > 0) {
		maxPage = Math.trunc(numberOfItems / 4);
	} else {
		maxPage = Math.trunc(numberOfItems / 4) - 1;
	}

	function firstPageClickHandler() {
		router.push(`/?p=0`);
	}

	function nextPageClickHandler() {
		router.replace(`/?p=${+query + 1}`);
	}

	function prevPageClickHandler() {
		router.push(`/?p=${+query - 1}`);
	}

	function lastPageClickHandler() {
		router.push(`/?p=${maxPage}`);
	}

	const lastParams = useSearchParams();
	const lastQuery = lastParams.get("p");

	let disablePrev = false;
	let disableNext = false;
	if (+lastQuery <= 0 || !lastQuery) {
		disablePrev = true;
		disableNext = false;
	} else if (+lastQuery - 1 >= numberOfItems / 4) {
		disablePrev = false;
		disableNext = true;
	}
	return (
		<div className={classes.controls}>
			<button onClick={firstPageClickHandler}>First Page</button>
			<button onClick={prevPageClickHandler} disabled={disablePrev}>
				Previous Page
			</button>
			<p>{`Page ${+query + 1} of ${maxPage + 1}`}</p>
			<button onClick={nextPageClickHandler} disabled={disableNext}>
				Next Page
			</button>
			<button onClick={lastPageClickHandler}>{`Last Page(${
				maxPage + 1
			})`}</button>
		</div>
	);
};

export default HomePageControls;
