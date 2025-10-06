import type { Meta, StoryObj } from "@storybook/nextjs";
import AccountCard from "./AccountCard";
import { AccountType, type Account } from "@/lib/types";

const meta: Meta<typeof AccountCard> = {
  title: "AccountCard",
  component: AccountCard,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof AccountCard>;

const electricity: Account = {
  id: "A-1001",
  type: AccountType.Electricity,
  address: "1 Greville Ct, Thomastown VIC",
  meterNumber: "1234567890",
  balance: 50,
};

const gas: Account = {
  id: "A-2001",
  type: AccountType.Gas,
  address: "74 Taltarni Rd, Yawong Hills VIC",
  volume: 3034,
  balance: -10,
};

const zeroBalance: Account = { ...electricity, balance: 0 };

export const ElectricityCredit: Story = {
  args: { account: electricity },
};

export const GasDebit: Story = {
  args: { account: gas },
};

export const ZeroBalance: Story = {
  args: { account: zeroBalance },
};
