
export enum AccountType {
  Electricity = "ELECTRICITY",
  Gas = "GAS",
}

export type ElectricityAccount = {
  id: string;
  type: AccountType.Electricity
  address: string;
  meterNumber: string;
};

export type GasAccount = {
  id: string;
  type: AccountType.Gas ;
  address: string;
  volume: number;
};

export type Account = ElectricityAccount | GasAccount;