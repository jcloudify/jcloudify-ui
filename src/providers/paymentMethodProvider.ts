import {
  PaymentMethod,
  PaymentMethodsAction,
} from "@jcloudify-api/typescript-client";
import {paymentApi, unwrap} from "@/services/poja-api";
import {authProvider} from "./authProvider";
import {ToRecord} from "./types";

export const paymentMethodProvider = {
  async getList() {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() => paymentApi().getPaymentMethods(uid)))
      .data as ToRecord<PaymentMethod>[];
  },
  async save(id: string, setDefault: boolean) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const params: PaymentMethodsAction = {
      payment_method_id: id,
      action: "ATTACH",
      set_default: setDefault,
    };
    return (await unwrap(() => paymentApi().managePaymentMethods(uid, params)))
      .data as ToRecord<PaymentMethod>[];
  },
  async delete(id: string) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const params: PaymentMethodsAction = {
      payment_method_id: id,
      action: "DETACH",
    };
    return (await unwrap(() => paymentApi().managePaymentMethods(uid, params)))
      .data as ToRecord<PaymentMethod>[];
  },
};
