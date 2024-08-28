import {PaymentCustomer} from "@jcloudify-api/typescript-client";
import {PagedResponse, PojaDataProvider, ToRecord} from "./types";
import {authProvider} from "./authProvider";
import {paymentApi, unwrap} from "../services/poja-api";

export const paymentDetailsProvider: PojaDataProvider<
  ToRecord<PaymentCustomer>
> = {
  getList: function (): Promise<PagedResponse<ToRecord<PaymentCustomer>>> {
    throw new Error("Function not implemented.");
  },
  getOne: async (id) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    console.log(id);
    return (await unwrap(() =>
      paymentApi().getCustomer(uid)
    )) as ToRecord<PaymentCustomer>;
  },
  save: async (resource: ToRecord<PaymentCustomer>) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      paymentApi().updatePaymentCustomer(uid, resource)
    )) as ToRecord<PaymentCustomer>;
  },
  saveAll: function (
    _resources: ToRecord<PaymentCustomer>[]
  ): Promise<ToRecord<PaymentCustomer>[]> {
    throw new Error("Function not implemented.");
  },
  delete: function (_id: string): Promise<ToRecord<PaymentCustomer>> {
    throw new Error("Function not implemented.");
  },
};
