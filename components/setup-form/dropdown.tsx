"use client";

import { changeUserData } from "@/lib/config-editor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import classes from "./dropdown.module.css";
import { revalidatePath } from "next/cache";

function Dropdown({ children, selectedValue }) {
	const [showList, setShowList] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();

	function listToggler() {
		showList ? setShowList(false) : setShowList(true);
	}

	async function itemSelectHandler(itemName: string) {
		await changeUserData(session.user.email, itemName);
		setShowList(false);
		revalidatePath("/", "layout");
		router.push("/");
	}

	return (
		<div className={classes.master}>
			<h3>Please select the collection you want to view.</h3>
			<div className={classes.container}>
				<button className={classes["dropdown-button"]} onClick={listToggler}>
					{selectedValue}
				</button>
				<div className={showList ? classes.listOn : classes.listOff}>
					{children.map((item) => (
						<div key={item} onClick={itemSelectHandler.bind(null, item)}>
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
