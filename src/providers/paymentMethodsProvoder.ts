import {
  PaymentMethod,
  PaymentMethodsAction,
} from "@jcloudify-api/typescript-client";
import {paymentApi, unwrap} from "@/services/poja-api";
import {PagedResponse, PojaDataProvider, ToRecord} from "./types";
import {authProvider} from "./authProvider";

export const paymentMethodsProvider: PojaDataProvider<any> = {
  getList: async (_page: number, _perPage: number) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      paymentApi().getPaymentMethods(uid)
    )) as PagedResponse<ToRecord<PaymentMethod>>;
  },
  getOne: function (_id): Promise<ToRecord<PaymentMethod>> {
    throw new Error("Function not implemented.");
  },
  save: async (resource: PaymentMethodsAction) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      paymentApi().managePaymentMethods(uid, resource)
    )) as PagedResponse<ToRecord<PaymentMethod>>;
  },
  saveAll: function (_resources): Promise<ToRecord<PaymentMethod>[]> {
    throw new Error("Function not implemented.");
  },
  delete: async (id: string) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const params: PaymentMethodsAction = {
      payment_method_id: id,
      action: "DETACH",
    };
    return (await unwrap(() =>
      paymentApi().managePaymentMethods(uid, params)
    )) as PagedResponse<ToRecord<PaymentMethod>>;
  },
};
