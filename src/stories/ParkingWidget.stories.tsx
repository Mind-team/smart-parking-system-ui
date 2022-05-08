import React from "react";
import { ParkingWidget } from "../components/ParkingWidget/ParkingWidget";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Driver/ParkingWidget",
  component: ParkingWidget,
} as ComponentMeta<typeof ParkingWidget>;

const Template: ComponentStory<typeof ParkingWidget> = (args: any) => (
  <ParkingWidget {...args} />
);

export const MiniUncompleted = Template.bind({});
MiniUncompleted.args = {
  size: "mini",
  data: {
    price: 200,
    detailsClick: () => {},
  },
};

export const MiniCompleted = Template.bind({});
MiniCompleted.args = {
  size: "mini",
  data: {
    parkingName: "Гринвич",
    date: new Date(),
    price: 300,
    detailsClick: () => {},
  },
};

export const Long = Template.bind({});
Long.args = {
  size: "long",
  data: {
    parkingName: "Гринвич",
    date: new Date(),
    price: 400,
    detailsClick: () => {},
  },
};
