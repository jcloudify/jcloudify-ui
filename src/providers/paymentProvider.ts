import {Identifier} from "react-admin";
import {Dict, PojaDataProvider} from "./types";

const mockPayment = [
  {
    id: "payment0",
    ref: "payment-ref-0",
    amount: "12.3",
    date: "07/2024",
    currency: "usd",
    status: "payed",
  },
  {
    id: "payment1",
    ref: "payment-ref-1",
    date: "06/2024",
    amount: "10.1",
    currency: "usd",
    status: "payed",
  },
];

export const paymentProvider: PojaDataProvider<any> = {
  async getList() {
    return Promise.resolve(mockPayment);
  },
  getOne: function (_id: Identifier, _meta?: Dict<any>): Promise<any> {
    throw new Error("Function not implemented.");
  },
  save: function (_resource: any, _meta?: Dict<any>): Promise<any> {
    throw new Error("Function not implemented.");
  },
  saveAll: function (_resources: any[], _meta?: Dict<any>): Promise<any[]> {
    throw new Error("Function not implemented.");
  },
  delete: function (_id: Identifier): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
