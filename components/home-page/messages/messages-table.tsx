import classes from "./messages-table.module.css";
import { Message } from "@/lib/types";
import MessageCard from "./message-card";

async function MessagesTable(props) {
	//const session = await auth();

	if (props.messagesIn.length > 0) {
		return (
			<div className={classes.master}>
				<h2>These are the messages</h2>
				{props.messagesIn.map((message: Message) => (
					<MessageCard
						message={message}
						index={props.messagesIn.indexOf(message) + 1}
						key={message.id}
					/>
				))}
			</div>
		);
	}

	if (!props.messagesIn || props.messagesIn.length === 0) {
		return <h2 className={classes.master}>There are no messages to show</h2>;
	}
}

export default MessagesTable;
