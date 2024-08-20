import {PaymentCustomer} from "@jcloudify-api/typescript-client";
import {paymentApi, unwrap} from "@/services/poja-api";
import {Dict, PagedResponse, PojaDataProvider, ToRecord} from "./types";
import {authProvider} from "./authProvider";

export const paymentDetailsProvider: PojaDataProvider<
  ToRecord<PaymentCustomer>
> = {
  getList: function (): Promise<PagedResponse<ToRecord<PaymentCustomer>>> {
    throw new Error("Function not implemented.");
  },
  getOne: async (id) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      paymentApi().getCustomer(uid)
    )) as ToRecord<PaymentCustomer>;
  },
  save: function (
    resource: ToRecord<PaymentCustomer>,
    meta?: Dict<any>
  ): Promise<ToRecord<PaymentCustomer>> {
    throw new Error("Function not implemented.");
  },
  saveAll: function (
    resources: ToRecord<PaymentCustomer>[],
    meta?: Dict<any>
  ): Promise<ToRecord<PaymentCustomer>[]> {
    throw new Error("Function not implemented.");
  },
  delete: function (id: string): Promise<ToRecord<PaymentCustomer>> {
    throw new Error("Function not implemented.");
  },
};
