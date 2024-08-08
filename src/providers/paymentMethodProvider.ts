import {
  PaymentMethod,
  PaymentMethodsAction,
} from "@jcloudify-api/typescript-client";
import {paymentApi, unwrap} from "@/services/poja-api";
import {authProvider} from "./authProvider";
import {PojaDataProvider, ToRecord} from "./types";
import {Identifier} from "react-admin";

export const paymentMethodProvider: PojaDataProvider<any> = {
  async getList() {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() => paymentApi().getPaymentMethods(uid)))
      .data as ToRecord<PaymentMethod>[];
  },
  getOne: function (_id: Identifier): Promise<any> {
    throw new Error("Function not implemented.");
  },
  async save(resource: any) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const params: PaymentMethodsAction = {
      payment_method_id: resource.id,
      action: "ATTACH",
      set_default: resource.setDefault,
    };
    return (await unwrap(() => paymentApi().managePaymentMethods(uid, params)))
      .data as ToRecord<PaymentMethod>[];
  },
  saveAll: function (_resources: any[]): Promise<any[]> {
    throw new Error("Function not implemented.");
  },
  async delete(id) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const params: PaymentMethodsAction = {
      payment_method_id: id as string,
      action: "DETACH",
    };
    return (await unwrap(() => paymentApi().managePaymentMethods(uid, params)))
      .data as ToRecord<PaymentMethod>[];
  },
};
