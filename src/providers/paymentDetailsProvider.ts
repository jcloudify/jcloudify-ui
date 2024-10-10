import {PaymentCustomer} from "@jcloudify-api/typescript-client";
import {PojaDataProvider, ToRecord} from "./types";
import {authProvider} from "./authProvider";
import {paymentApi, unwrap} from "../services/poja-api";

export const paymentDetailsProvider: PojaDataProvider<
  ToRecord<PaymentCustomer>
> = {
  getList: function () {
    throw new Error("Function not implemented.");
  },
  getOne: async (id: string) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    console.log(id);
    return (await unwrap(() =>
      paymentApi().getCustomer(uid)
    )) as ToRecord<PaymentCustomer>;
  },
  save: function () {
    throw new Error("Function not implemented.");
  },
  saveAll: function () {
    throw new Error("Function not implemented.");
  },
  delete: function () {
    throw new Error("Function not implemented.");
  },
  deleteMany: function () {
    throw new Error("Function not implemented.");
  },
};
