"use client";

import Image from "next/image";
import { mongoMessageEraser } from "@/lib/mongoDB-handler";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import svgTrash from "@/public/images/trash.svg";

import classes from "./messages-table.module.css";

function MessagesTable({ messagesIn }) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState(messagesIn);

  useEffect(() => {
    setMessages(messagesIn);
  }, [messagesIn]);

  async function deleteMessageHandler(selectedMessage: string) {
    if (
      window.confirm("This action cannot be undone. Do you want to delete?")
    ) {
      await mongoMessageEraser(session.user.email, selectedMessage);
    }
  }

  if (messages.length > 0) {
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
                    onClick={deleteMessageHandler.bind(null, message.message)}
                    className={classes.delete}
                  >
                    {<Image src={svgTrash} alt="del" height={48} width={48} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!messages || messages.legth === 0) {
    return <h2>There are no messages to show</h2>;
  }
}

export default MessagesTable;
