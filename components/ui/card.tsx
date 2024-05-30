import React from "react";

import classes from "./card.module.css";

const Card: React.FC<{ children: JSX.Element }> = ({ children }) => {
	return <div className={classes.card}>{children}</div>;
};

export default Card;
