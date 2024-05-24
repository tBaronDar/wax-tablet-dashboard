"use client";

import { changeUserData } from "@/lib/config-editor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import classes from "./dropdown.module.css";
import { mongoUpdateUserProfile } from "@/lib/mongoDB-handler";
import { revalidatePath } from "next/cache";

function Dropdown(props) {
	const [showList, setShowList] = useState(false);
	const [buttonText, setButtonText] = useState(props.selectedValue);
	const [userEmail, setUserEmail] = useState(props.email);

	const router = useRouter();

	function listToggler() {
		showList ? setShowList(false) : setShowList(true);
	}

	function listHide() {
		if (showList) {
			setShowList(false);
		}
	}

	async function itemSelectHandler(itemName: string) {
		console.log("list item clicked");
		setButtonText(itemName);
		setShowList(false);
		await mongoUpdateUserProfile(props.userEmail, itemName);
		//revalidatePath("/");
		router.refresh();
	}

	return (
		<div className={classes.master}>
			<h3>Please select the collection you want to view.</h3>
			<div className={classes.container}>
				<button className={classes["dropdown-button"]} onClick={listToggler}>
					{buttonText}
					<span>&#8595;</span>
				</button>
				<div className={showList ? classes.listOn : classes.listOff}>
					{props.collectionsArray.map((item) => (
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
