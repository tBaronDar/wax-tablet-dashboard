"use client";
import { mongoGet } from "@/lib/mongoDB-handler";
import ServerContext from "@/store";
import { useContext, useEffect, useState } from "react";

function MessagesTable() {
  const [data, setData] = useState({
    collections: [],
    messages: [],
    message: "",
  });

  const [status, setStatus] = useState("loading");

  const context = useContext(ServerContext);
  const username = context.username;
  const password = context.password;

  useEffect(() => {
    async function messagesGetter(username: string, password: string) {
      const fetchedData = await mongoGet(username, password);
      setData({
        collections: fetchedData.collections,
        messages: fetchedData.messages,
        message: "",
      });
    }
    if (!username || !password || username === "" || password === "") {
      setStatus("no-data");
      //setData({ collections: [], messages: [], message: "rourou" });
      return;
    }
    setStatus("loading");
    messagesGetter(username, password);
    setStatus("success");
  }, [username, password]);

  const showtable: boolean =
    data.collections.length > 0 && data.messages.length > 0;

  if (status === "no-data") {
    return <h2>Please insert data</h2>;
  }
  if (status === "loading") {
    return <h2>Loading, please wait...</h2>;
  }

  return (
    <section>
      <h1>This are the messages</h1>
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
            {data.messages.map((message) => (
              <tr key={message._id}>
                <td>{data.messages.indexOf(message) + 1}</td>
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
