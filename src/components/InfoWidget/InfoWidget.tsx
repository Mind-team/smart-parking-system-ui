import React, { FC } from "react";
import classes from "./InfoWidget.styles.module.css";

export enum GradientBackground {
  RedNBlue = "linear-gradient(229.27deg, #003AFF -20.08%, #FF0000 151.7%)",
  LightPink = "linear-gradient(225.64deg, #EAB496 3.52%, #EF81F8 100%)",
  Purple = "linear-gradient(225.64deg, #886DEC 3.52%, #56439E 100%)",
  YellowNOrange = "linear-gradient(225deg, #FB8383 0%, #FFE480 100%)",
}

export interface IMiniInfoWidgetData {
  leftSideText: string;
  rightSideText: string;
}

export interface IMiniInfoWidgetProps {
  size: "mini";
  data: IMiniInfoWidgetData;
}

export interface IRoundInfoWidgetData {
  text: string;
  // TODO: add Gradient enum
  gradientBackground: string | GradientBackground;
  iconLink?: string;
}

export interface IRoundInfoWidgetProps {
  size: "round";
  data: IRoundInfoWidgetData;
}

export type IInfoWidgetProps = IMiniInfoWidgetProps | IRoundInfoWidgetProps;

export const InfoWidget: FC<IInfoWidgetProps> = ({ size, data }) => {
  if (size === "mini" && "leftSideText" in data && "rightSideText" in data) {
    return (
      <div className={`${classes.miniControl}`}>
        <div className={`${classes.miniControlLeftSide}`}>
          {data.leftSideText}
        </div>
        <div className={`${classes.miniControlRightSide}`}>
          <span className={`${classes.miniControlRightSideText}`}>
            {data.rightSideText}
          </span>
        </div>
      </div>
    );
  }

  if (size === "round" && "text" in data) {
    return (
      <div
        className={`${classes.roundControl}`}
        style={{ background: data.gradientBackground }}
      >
        <span className={`${classes.roundControlText}`}>{data.text}</span>
      </div>
    );
  }

  return <></>;
};
