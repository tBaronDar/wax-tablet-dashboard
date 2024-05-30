"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingSpinner from "./loading-spinner";
import { mongoMessageEraser } from "@/lib/mongoDB-handler";
import svgTrash from "@/public/images/trash.svg";

import classes from "./delete-button.module.css";

function DeleteButton(props) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function deleteMessageHandler() {
		if (
			window.confirm("This action cannot be undone. Do you want to delete?")
		) {
			setIsLoading(true);
			await mongoMessageEraser(props.email, props.message);
			router.replace("/");
			setIsLoading(false);
		}
	}
	return (
		<button className={classes.delete} onClick={deleteMessageHandler}>
			{!isLoading && <Image src={svgTrash} alt="del" height={48} width={48} />}
			{isLoading && <LoadingSpinner />}
		</button>
	);
}

export default DeleteButton;
