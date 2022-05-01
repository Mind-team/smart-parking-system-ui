import React from "react";
import {
  GradientBackground,
  InfoWidget,
} from "../components/InfoWidget/InfoWidget";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Common/Info Widget",
  component: InfoWidget,
} as ComponentMeta<typeof InfoWidget>;

const Template: ComponentStory<typeof InfoWidget> = (args: any) => (
  <InfoWidget {...args} />
);

export const Mini = Template.bind({});
Mini.args = {
  size: "mini",
  data: {
    leftSideText: "Ваша карта:",
    rightSideText: "8480",
  },
};

export const Round = Template.bind({});
Round.args = {
  size: "round",
  data: {
    text: "Hello",
    gradientBackground: GradientBackground.RedNBlue,
  },
};
