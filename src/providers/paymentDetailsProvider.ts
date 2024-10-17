import {PaymentCustomer} from "@jcloudify-api/typescript-client";
import {paymentApi, unwrap} from "@/services/poja-api";
import {PojaDataProvider, ToRecord} from "./types";
import {authProvider} from "./authProvider";

export const paymentDetailsProvider: PojaDataProvider<
  ToRecord<PaymentCustomer>
> = {
  getList: function () {
    throw new Error("Function not implemented.");
  },
  getOne: async (id: string) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const paymentDetails = (await unwrap(() =>
      paymentApi().getCustomer(uid)
    )) as ToRecord<PaymentCustomer>;
    return {...paymentDetails, id};
  },
  save: () => {
    throw new Error("Function not implemented.");
  },
  saveAll: () => {
    throw new Error("Function not implemented.");
  },
  delete: () => {
    throw new Error("Function not implemented.");
  },
  deleteMany: () => {
    throw new Error("Function not implemented.");
  },
};
