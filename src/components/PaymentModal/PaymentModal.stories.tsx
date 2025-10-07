import type { Meta, StoryObj } from "@storybook/nextjs";
import PaymentModal from "./PaymentModal";
import { Account, AccountType } from "@/lib/types";

const mockedAccount: Account = {
  id: "1",
  address: "123 Main Street, Melbourne VIC 3000",
  balance: -150.75,
  type: AccountType.Electricity,
  meterNumber: "123456789",
};

const meta = {
  title: "PaymentModal",
  component: PaymentModal,
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
  },
} satisfies Meta<typeof PaymentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    account: mockedAccount,
    onClose: () => console.log("Modal closed"),
  },
};
