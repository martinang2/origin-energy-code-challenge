import { Account, AccountType } from "@/lib/types/account";
import { delay, http, HttpResponse } from "msw";

export const mockedAccounts: Account[] = [
  {
    id: "A-0001",
    type: AccountType.Electricity,
    address: "1 Greville Ct, Thomastown, 3076, Victoria",
    meterNumber: "1234567890",
    balance: 250.75,
  },
  {
    id: "A-0002",
    type: AccountType.Gas,
    address: "74 Taltarni Rd, Yawong Hills, 3478, Victoria",
    volume: 3034,
    balance: -180.5,
  },
  {
    id: "A-0003",
    type: AccountType.Electricity,
    address: "44 William Road, Cresswell Downs, 0862, Northern Territory",
    meterNumber: "12345672313",
    balance: 0,
  },
  {
    id: "A-0004",
    type: AccountType.Electricity,
    address: "87 Carolina Park Road, Forresters Beach, 2260, New South Wales",
    meterNumber: "12345671244",
    balance: 75.0,
  },
  {
    id: "A-0005",
    type: AccountType.Gas,
    address: "12 Sunset Blvd, Redcliffe, 4020, Queensland",
    volume: 1900,
    balance: -50.25,
  },
  {
    id: "A-0006",
    type: AccountType.Electricity,
    address: "3 Ocean View Dr, Torquay, 3228, Victoria",
    meterNumber: "12412421244",
    balance: 0,
  },
  {
    id: "A-0007",
    type: AccountType.Gas,
    address: "150 Greenway Cres, Mawson Lakes, 5095, South Australia",
    volume: 1853,
    balance: -300,
  },
  {
    id: "A-0008",
    type: AccountType.Electricity,
    address: "88 Harbour St, Sydney, 2000, New South Wales",
    meterNumber: "22223141443",
    balance: 120.5,
  },
  {
    id: "A-0009",
    type: AccountType.Gas,
    address: "22 Boulder Rd, Kalgoorlie, 6430, Western Australia",
    volume: 1000,
    balance: 0,
  },
];

export const accountHandlers = {
  success: () =>
    http.get("/api/accounts", async () => {
      await delay(1000);
      return HttpResponse.json({ data: mockedAccounts });
    }),
  loading: () =>
    http.get("/api/accounts", async () => {
      await delay("infinite");
      return HttpResponse.json({});
    }),
  error: () =>
    http.get("/api/accounts", async () => {
      await delay(1000);
      return HttpResponse.json(
        { message: "Unable to fetch accounts. Please try again later." },
        { status: 500 }
      );
    }),
};
