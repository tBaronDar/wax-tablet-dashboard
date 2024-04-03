"use client";

import { useState } from "react";

function Dropdown({ children }) {
  const [styles, setStyles] = useState({ display: "block" });

  function clickHandler() {
    if (styles.display === "none") {
      setStyles({ display: "block" });
    }
    if (styles.display === "block") {
      setStyles({ display: "none" });
    }
  }
  const stylesObj = { display: "block" };

  return (
    <div>
      <button onClick={clickHandler}>Drop list</button>
      <div style={styles}>{children}</div>
    </div>
  );
}

export default Dropdown;
