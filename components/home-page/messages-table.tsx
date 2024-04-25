"use client";

import { readJsonData } from "@/lib/config-editor";
import { mongoMessagesGetter } from "@/lib/mongoDB-handler";
import { useEffect, useState } from "react";

function MessagesTable({ username, password, messagesIn }) {
	const [messages, setMessages] = useState(messagesIn);

	useEffect(() => {
		setMessages(messagesIn);
	}, [username, password, messagesIn]);

	async function refreshHandler() {
		const setupData = await readJsonData();
		const { database, collection } = setupData;

		const readMessages = await mongoMessagesGetter(
			username,
			password,
			database,
			collection
		);
		setMessages(readMessages);
	}

	let showtable: boolean = false;
	if (messages.length > 0) {
		showtable = true;
	}

	return (
		<>
			{showtable && (
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
									<button>delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
}

export default MessagesTable;
