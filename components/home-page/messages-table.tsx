"use client";

import { readJsonData } from "@/lib/config-editor";
import { mongoMessagesGetter } from "@/lib/mongoDB-handler";
import { useState } from "react";

function MessagesTable() {
	const [messages, setMessages] = useState([]);

	async function refreshHandler() {
		const setupData = await readJsonData();
		const { database, collection } = setupData;

		const readMessages = await mongoMessagesGetter(database, collection);
		setMessages(readMessages);
	}

	let showtable: boolean = false;
	if (messages.length > 0) {
		showtable = true;
		//setStatus("success");
	}

	// if (status === "no-data") {
	//   return <h2>Please insert data</h2>;
	// }
	// if (status === "loading") {
	//   return <h2>Loading, please wait...</h2>;
	// }

	return (
		<section>
			<h1>This are the messages</h1>
			<button type="button" onClick={refreshHandler}>
				Refresh
			</button>
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
		</section>
	);
}

export default MessagesTable;
