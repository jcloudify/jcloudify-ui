import {PagedResponse, PojaDataProvider, ToRecord} from "./types";
import {TodoPayment, paymentsMock} from "#/payment.mock";

export const paymentProvider: PojaDataProvider<ToRecord<TodoPayment>> = {
  getList: function (): Promise<PagedResponse<TodoPayment>> {
    return Promise.resolve({data: paymentsMock});
  },
  getOne: function (_id): Promise<any> {
    throw new Error("Function not implemented.");
  },
  save: function (_resource): Promise<any> {
    throw new Error("Function not implemented.");
  },
  saveAll: function (_resources): Promise<any[]> {
    throw new Error("Function not implemented.");
  },
  delete: function (_id): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
