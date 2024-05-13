"use client";

import { changeUserData } from "@/lib/config-editor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import classes from "./dropdown.module.css";

function Dropdown({ children, selectedValue }) {
  const [showList, setShowList] = useState(false);
  const [buttonText, setButtonText] = useState(selectedValue);

  const { data: session } = useSession();
  const router = useRouter();

  function listToggler() {
    showList ? setShowList(false) : setShowList(true);
  }

  function listHide() {
    if (showList) {
      setShowList(false);
    }
  }

  async function itemSelectHandler(itemName: string) {
    setButtonText(itemName);
    setShowList(false);
    await changeUserData(session.user.email, itemName);
  }

  return (
    <div className={classes.master}>
      <h3>Please select the collection you want to view.</h3>
      <div className={classes.container}>
        <button
          className={classes["dropdown-button"]}
          onClick={listToggler}
          onBlur={listToggler}
        >
          {buttonText}
          <span>&#8595;</span>
        </button>
        <div className={showList ? classes.listOn : classes.listOff}>
          {children.map((item) => (
            <div
              key={item}
              className={classes["list-item"]}
              onClick={itemSelectHandler.bind(null, item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
