"use client";

import { mongoMessageEraser, mongoMessagesGetter } from "@/lib/mongoDB-handler";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function MessagesTable({ username, password, messagesIn }) {
	const { data: session } = useSession();
	const [messages, setMessages] = useState(messagesIn);
	const router = useRouter();

	useEffect(() => {
		setMessages(messagesIn);
	}, [username, password, messagesIn]);

	async function refreshHandler() {}

	async function deleteMessageHandler(selectedMessage: string) {
		if (
			window.confirm("This action cannot be undone. Do you want to delete?")
		) {
			await mongoMessageEraser(session.user.email, selectedMessage);
			router.refresh();
		}
	}

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>*</th>
						<th>Name</th>
						<th>Email</th>
						<th>Message</th>
						<th>Contols</th>
					</tr>
				</thead>
				<tbody>
					{messages.map((message) => (
						<tr key={message.id}>
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

export default MessagesTable;
