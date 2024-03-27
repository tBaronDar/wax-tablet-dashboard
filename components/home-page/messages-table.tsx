"use client";
import ServerContext from "@/store";
import { useContext } from "react";

function MessagesTable() {
  const context = useContext(ServerContext);

  //console.log(context.password);

  return <p>test</p>;
}

export default MessagesTable;
