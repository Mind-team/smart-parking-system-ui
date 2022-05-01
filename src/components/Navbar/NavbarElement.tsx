import React, { FC } from "react";
import classes from "./Navbar.styles.module.css";

export interface INavbarElementProps {
  title: string;
}

export const NavbarElement: FC<INavbarElementProps> = ({ title }) => {
  return (
    <div className={`${classes.elementWrapper}`}>
      <span className={`${classes.elementTitle}`}>{title}</span>
    </div>
  );
};
