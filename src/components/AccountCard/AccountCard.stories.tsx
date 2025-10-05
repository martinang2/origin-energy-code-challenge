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
    id: "A-12345",
    type: AccountType.Electricity,
    address: "35 Exhibition Street, Reservoir, VIC",
    meterNumber: "1234567890",
};

const gas: Account = {
    id: "A-54321",
    type: AccountType.Gas,
    address: "74 Taltarni Rd, Yawong Hills, VIC",
    volume: 3034,
};

export const ElectricityCredit: Story = {
    args: { account: electricity, balance: 30 },
};

export const GasDebit: Story = {
    args: { account: gas, balance: -25 },
};

export const ZeroBalance: Story = {
    args: { account: electricity, balance: 0 },
};