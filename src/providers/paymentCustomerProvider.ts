import {Identifier} from "react-admin";
import {Dict, PojaDataProvider} from "./types";

const customer = {
  id: "customer_id",
  name: "Stripe Customer",
  email: "test@example.com",
  phone: "+2612547896",
};

export const paymentCustomerProvider: PojaDataProvider<any> = {
  getList: function (
    page: number,
    perPage: number,
    filter?: Dict<any>,
    meta?: Dict<any>
  ): Promise<any[]> {
    throw new Error("Function not implemented.");
  },
  getOne: function (_id: Identifier): Promise<any> {
    return Promise.resolve(customer);
  },
  save: function (resource: any): Promise<any> {
    console.log("updateRes: ", resource);
    return Promise.resolve(resource);
  },
  saveAll: function (resources: any[], meta?: Dict<any>): Promise<any[]> {
    throw new Error("Function not implemented.");
  },
  delete: function (id: Identifier): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
