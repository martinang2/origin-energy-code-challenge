export enum AccountType {
  Electricity = "ELECTRICITY",
  Gas = "GAS",
}

interface BaseAccount {
  id: string;
  type: AccountType;
  address: string;
  balance: number;
}

export interface ElectricityAccount extends BaseAccount {
  type: AccountType.Electricity;
  meterNumber: string;
}

export interface GasAccount extends BaseAccount {
  type: AccountType.Gas;
  volume: number;
}

export type Account = ElectricityAccount | GasAccount;
