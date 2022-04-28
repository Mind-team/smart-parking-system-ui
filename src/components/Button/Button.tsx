import React, { FC } from "react";
import "./Button.styles.css";

export interface IButtonProps {
  title: string;
  onClick: () => void;
  type?: "primary" | "secondary";
  size?: "s" | "m" | "l";
  onHover?: () => void;
  onLoseHover?: () => void;
}

export const Button: FC<IButtonProps> = ({
  title,
  onClick,
  type = "primary",
  size = "m",
  onLoseHover,
  onHover,
}) => {
  return (
    <button
      onMouseLeave={onLoseHover}
      onMouseEnter={onHover}
      className={`btn-wrapper ${size} ${type}`}
      onClick={onClick}
    >
      <span className={`btn-text text-${size} text-${type}`}>{title}</span>
    </button>
  );
};
