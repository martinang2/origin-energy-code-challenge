import Navbar from "./Navbar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Navbar> = {
    title: "Layout/Navbar",
    component: Navbar,
    parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const AccountsActive: Story = {
    parameters: {
        nextjs: { appDirectory: true, navigation: { pathname: "/accounts" } },
    },
};

export const PaymentsActive: Story = {
    parameters: {
        nextjs: { appDirectory: true, navigation: { pathname: "/payments" } },
    },
};