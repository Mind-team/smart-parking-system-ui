import React, { FC, useState } from "react";
import miniWidgetStyles from "./ParkingWidgetMini.styles.module.css";
import longWidgetStyles from "./ParkingWidgetLong.styles.module.css";
import { useFormatter } from "../../hooks";

export interface IParkingWidgetData {
  parkingName: string;
  date: string | Date;
  price: number;
  detailsClick: () => void;
}

export interface IMiniCompletedParkingWidgetProps {
  size: "mini";
  data: IParkingWidgetData;
}

export interface IMiniUncompletedParkingWidgetProps {
  size: "mini";
  data: Pick<IParkingWidgetData, "price" | "detailsClick">;
}

export interface ILongParkingWidgetProps {
  size: "long";
  data: Pick<
    IParkingWidgetData,
    "parkingName" | "date" | "price" | "detailsClick"
  >;
}

export type IParkingWidgetProps =
  | IMiniCompletedParkingWidgetProps
  | IMiniUncompletedParkingWidgetProps
  | ILongParkingWidgetProps;

export const ParkingWidget: FC<IParkingWidgetProps> = ({ size, data }) => {
  const formatter = useFormatter();
  const [isHover, setHover] = useState(false);
  const formattedDate = formatter(
    "date",
    // TODO: remove as string
    ("date" in data ? data.date : null) as string,
  );
  const formattedTime = formatter(
    "time",
    // TODO: remove as string
    ("date" in data ? data.date : null) as string,
  );

  if (size === "mini") {
    return (
      <div className={miniWidgetStyles.wrapper}>
        {"parkingName" in data && data.parkingName && data.date ? (
          <div className={miniWidgetStyles.titleWrapper}>
            <span>{data.parkingName}</span>
            <span>{formattedTime}</span>
            <span>{formattedDate}</span>
          </div>
        ) : (
          <div className={miniWidgetStyles.titleWrapperUnfilled}>
            <span>Вы сейчас на парковке</span>
          </div>
        )}
        <div className={miniWidgetStyles.sum}>{`${data.price}₽`}</div>
        <div className={miniWidgetStyles.details} onClick={data.detailsClick}>
          Подробнее
        </div>
      </div>
    );
  }

  return (
    <div
      className={longWidgetStyles.wrapper}
      onMouseEnter={() => setHover(!isHover)}
      onMouseLeave={() => setHover(!isHover)}
    >
      <div className={longWidgetStyles.title}>
        {(data as unknown as ILongParkingWidgetProps["data"]).parkingName}
      </div>
      <div onClick={data.detailsClick}>
        {isHover ? "Подробнее" : `${data.price}₽`}
      </div>
      <div className={longWidgetStyles.date}>{formattedDate}</div>
    </div>
  );
};
