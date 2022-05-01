import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavbarElement } from "../components/Navbar/NavbarElement";

export default {
  title: "Common/Navbar",
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args: any) => (
  <Navbar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <NavbarElement title={"Главная"} />
      <NavbarElement title={"История"} />
      <NavbarElement title={"Парковки"} />
      <NavbarElement title={"Профиль"} />
    </>
  ),
};
