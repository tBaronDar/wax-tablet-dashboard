"use client";
import Image from "next/image";
import svgTrash from "@/public/images/trash.svg";
import { mongoMessageEraser } from "@/lib/mongoDB-handler";

import classes from "./delete-button.module.css";
import { useState } from "react";
import LoadingSpinner from "./loading-spinner";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

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
