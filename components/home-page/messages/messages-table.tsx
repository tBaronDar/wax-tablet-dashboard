"use client";

import classes from "./messages-table.module.css";
import { Message, UserProfile } from "@/lib/types";
import MessageCard from "./message-card";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { mongoMessagesGetter } from "@/lib/mongoDB-handler";
import { useSearchParams } from "next/navigation";

const MessagesTable: React.FC<{
	messagesIn: Message[];
	userProfile: UserProfile;
}> = ({ messagesIn, userProfile }) => {
	const [messages, setMessages] = useState(messagesIn);
	const [isLoading, setIsLoading] = useState(false);
	const query = useSearchParams();

	useEffect(() => {
		const dataGetter = async () => {
			setIsLoading(true);
			const data = await mongoMessagesGetter(
				query,
				userProfile.username,
				userProfile.password,
				userProfile.database,
				userProfile.collection
			);
			setMessages(data);
			setIsLoading(false);
		};
		dataGetter();
	}, [messagesIn]);

	if (!messages || messages.length === 0) {
		return <h2 className={classes.master}>There are no messages to show</h2>;
	}

	return (
		<>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<div className={classes.master}>
					<h2>These are the messages</h2>
					{messages.map((message: Message) => (
						<MessageCard
							message={message}
							index={messages.indexOf(message) + 1}
							key={message.id}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default MessagesTable;
