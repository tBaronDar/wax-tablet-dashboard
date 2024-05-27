"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import classes from "./dropdown.module.css";
import { mongoUpdateUserProfile } from "@/lib/mongoDB-handler";
import LoadingSpinner from "../ui/loading-spinner";
import { connectHandler } from "@/lib/actions";

function Dropdown(props) {
	const [showList, setShowList] = useState(false);
	const [buttonText, setButtonText] = useState(props.selectedValue);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	function listToggler() {
		showList ? setShowList(false) : setShowList(true);
	}

	async function itemSelectHandler(itemName: string) {
		setButtonText(itemName);
		setIsLoading(true);
		setShowList(false);
		await mongoUpdateUserProfile(props.userEmail, itemName);
		await connectHandler();
		setIsLoading(false);
	}

	function listHide() {
		if (!isLoading) {
			setShowList(false);
		}
	}
	return (
		<div className={classes.master}>
			{isLoading && <LoadingSpinner />}
			{!isLoading && <h3>Please select the collection you want to view.</h3>}
			<div className={classes.container} onMouseLeave={listHide}>
				<button
					disabled={isLoading}
					className={classes["dropdown-button"]}
					onClick={listToggler}>
					{buttonText}
					<span>&#8595;</span>
				</button>
				<div className={showList ? classes.listOn : classes.listOff}>
					{props.collectionsArray.map((item: string) => (
						<div
							key={item}
							className={classes["list-item"]}
							onClick={itemSelectHandler.bind(null, item)}>
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
