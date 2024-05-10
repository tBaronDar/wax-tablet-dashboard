import Link from "next/link";
import svgIcon from "@/public/images/logo.svg";

import classes from "./main-navigation.module.css";
import Image from "next/image";

export function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href={"/"}>
        <div className={classes.logo}>
          <Image src={svgIcon} alt={"Logo"} width={100} height={100} />
        </div>
      </Link>
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
