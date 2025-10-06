import type { Meta, StoryObj } from "@storybook/nextjs";
import PageHeader from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "PageHeader",
  component: PageHeader,
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "My Accounts",
    subtitle: "View and manage your energy accounts easily.",
  },
};

export const WithChildren: Story = {
  args: {
    title: "Dashboard",
    subtitle: "Overview of your energy usage and payments.",
    children: (
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Action
      </button>
    ),
  },
};
