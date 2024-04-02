//"use client";
//import { useState } from "react";

function MessagesTable({ data }) {
  //const [status, setStatus] = useState("loading");

  let showtable: boolean = false;
  if (data.collections.length > 0 && data.messages.length > 0) {
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
