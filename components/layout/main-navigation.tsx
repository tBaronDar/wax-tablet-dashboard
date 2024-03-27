import Link from "next/link";
import svgIcon from "@/public/images/next";

import classes from "./main-navigation.module.css";

export function MainNavigation() {
  return (
    <header className={classes.header}>
      {svgIcon}
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/setup"}>Setup</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
