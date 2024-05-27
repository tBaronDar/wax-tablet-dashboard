import { auth } from "@/auth";
import DeleteButton from "../ui/delete-button";

import classes from "./messages-table.module.css";

async function MessagesTable(props) {
	const session = await auth();

	if (props.messagesIn.length > 0) {
		return (
			<div className={classes.master}>
				<h2>These are the messages</h2>
				<table className={classes.table}>
					<tbody>
						{props.messagesIn.map((message) => (
							<tr key={message.id} className={classes["table-row"]}>
								<td>{props.messagesIn.indexOf(message) + 1}</td>
								<td>{message.name}</td>
								<td>{message.email}</td>
								<td>{message.message}</td>
								<td>
									<DeleteButton
										message={message.message}
										email={session.user.email}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	if (!props.messagesIn || props.messagesIn.length === 0) {
		return <h2>There are no messages to show</h2>;
	}
}

export default MessagesTable;
