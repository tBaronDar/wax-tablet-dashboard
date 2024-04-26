"use client";

import { changeUserData } from "@/lib/config-editor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Dropdown({ children, selectedValue }) {
	const [styles, setStyles] = useState({ display: "none" });
	const { data: session } = useSession();
	const router = useRouter();

	function clickHandler() {
		if (styles.display === "none") {
			setStyles({ display: "block" });
		}
		if (styles.display === "block") {
			setStyles({ display: "none" });
		}
	}
	async function itemSelectHandler(itemName: string) {
		await changeUserData(session.user.email, itemName);
		setStyles({ display: "none" });
		router.refresh();
	}

	return (
		<div>
			<div>
				<label htmlFor="list">Select your collection:</label>
				<button onClick={clickHandler}>{selectedValue}</button>
			</div>
			{children.map((item) => (
				<div
					style={styles}
					key={item}
					onClick={itemSelectHandler.bind(null, item)}>
					{item}
				</div>
			))}
		</div>
	);
}

export default Dropdown;
