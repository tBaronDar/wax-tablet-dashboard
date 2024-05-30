import React from "react";
import { Message } from "@/lib/types";

import classes from "./message-card.module.css";
import DeleteButton from "@/components/ui/delete-button";

const MessageCard: React.FC<{ message: Message; index: number }> = ({
	message,
	index,
}) => {
	return (
		<div className={classes["master"]}>
			<div className={classes["grid-container"]}>
				<div className={classes["controls"]}>
					<DeleteButton />
				</div>
				<div className={classes["email"]}>{message.email}</div>
				<div className={classes["name"]}>{message.name}</div>
				<div className={classes["message"]}>{message.message}</div>
				<div className={classes["number"]}>{`Item number: ${index}`}</div>
			</div>
		</div>
	);
};

export default MessageCard;
