import {PaymentMethod} from "@jcloudify-api/typescript-client";
import {Dict, PagedResponse, PojaDataProvider, ToRecord} from "./types";
import {paymentApi, unwrap} from "@/services/poja-api";
import {authProvider} from "./authProvider";

export const paymentMethodsProvider: PojaDataProvider<ToRecord<PaymentMethod>> =
  {
    getList: async (page: number, perPage: number) => {
      const uid = authProvider.getCachedWhoami()?.user?.id!;
      return (await unwrap(() =>
        paymentApi().getPaymentMethods(uid)
      )) as PagedResponse<ToRecord<PaymentMethod>>;
    },
    getOne: function (_id): Promise<ToRecord<PaymentMethod>> {
      throw new Error("Function not implemented.");
    },
    save: function (
      resource: ToRecord<PaymentMethod>,
      meta?: Dict<any>
    ): Promise<ToRecord<PaymentMethod>> {
      throw new Error("Function not implemented.");
    },
    saveAll: function (_resources): Promise<ToRecord<PaymentMethod>[]> {
      throw new Error("Function not implemented.");
    },
    delete: function (id: string): Promise<ToRecord<PaymentMethod>> {
      throw new Error("Function not implemented.");
    },
  };
