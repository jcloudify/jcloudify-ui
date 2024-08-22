import {PaymentCustomer} from "@jcloudify-api/typescript-client";
import {PagedResponse, PojaDataProvider, ToRecord} from "./types";
import {authProvider} from "./authProvider";
import {unwrap} from "../services/poja-api";
import axios from "axios";

export const paymentDetailsProvider: PojaDataProvider<
  ToRecord<PaymentCustomer>
> = {
  getList: function (): Promise<PagedResponse<ToRecord<PaymentCustomer>>> {
    throw new Error("Function not implemented.");
  },
  getOne: async (id) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      axios.get(`http://localhost:5000/users/${uid}/payment-details/${id}`)
    )) as ToRecord<PaymentCustomer>;
  },
  save: async (resource: ToRecord<PaymentCustomer>) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      axios.put(`http://localhost:5000/users/${uid}/payment-details`, resource)
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
