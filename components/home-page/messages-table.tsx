"use client";

import { mongoMessageEraser, mongoMessagesGetter } from "@/lib/mongoDB-handler";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import classes from "./messages-table.module.css";
import { revalidatePath } from "next/cache";

function MessagesTable({ messagesIn }) {
	const { data: session } = useSession();
	const [messages, setMessages] = useState(messagesIn);
	const router = useRouter();

	// useEffect(() => {
	// 	setMessages(messagesIn);
	// }, [ messagesIn]);

	async function deleteMessageHandler(selectedMessage: string) {
		if (
			window.confirm("This action cannot be undone. Do you want to delete?")
		) {
			await mongoMessageEraser(session.user.email, selectedMessage);
			revalidatePath("/");
		}
	}

	if (messagesIn.length > 0) {
		return (
			<div className={classes.master}>
				<h2>This are the messages</h2>
				<table className={classes.table}>
					{/* <thead className={classes["table-head"]}>
						<tr className={classes["table-row"]}>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr> */}
					{/* </thead> */}
					<tbody>
						{messages.map((message) => (
							<tr key={message.id} className={classes["table-row"]}>
								<td>{messages.indexOf(message) + 1}</td>
								<td>{message.name}</td>
								<td>{message.email}</td>
								<td>{message.message}</td>
								<td>
									<button
										onClick={deleteMessageHandler.bind(null, message.message)}>
										delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	if (!messagesIn || messagesIn.legth === 0) {
		return <h2>There are no messages to show</h2>;
	}
}

export default MessagesTable;
