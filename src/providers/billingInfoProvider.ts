import {BillingInfo} from "@jcloudify-api/typescript-client";
import {PagedResponse, PojaDataProvider, ToRecord} from "./types";
import {billingApi, unwrap} from "@/services/poja-api";
import {authProvider} from "./authProvider";

export const billingInfoProvider: PojaDataProvider<ToRecord<BillingInfo>> = {
  async getOne(targetId, meta = {}): Promise<ToRecord<BillingInfo>> {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    switch (meta.targetResource) {
      case "application":
        const res = await unwrap(() =>
          billingApi().getUserApplicationBillingInfo(
            uid,
            targetId,
            startDate,
            currentDate
          )
        );
        return mapToBillingInfo(res, targetId, startDate, currentDate);
      case "environment":
        return (await unwrap(() =>
          billingApi().getUserAppEnvironmentBillingInfo(
            uid,
            meta.appId,
            targetId,
            startDate,
            currentDate
          )
        )) as ToRecord<BillingInfo>;
      default:
        return (await unwrap(() =>
          billingApi().getUserBillingInfo(uid, startDate, currentDate)
        )) as ToRecord<BillingInfo>;
    }
  },
  getList: function (): Promise<PagedResponse<ToRecord<BillingInfo>>> {
    throw new Error("Function not implemented.");
  },
  save: function (): Promise<ToRecord<BillingInfo>> {
    throw new Error("Function not implemented.");
  },
  saveAll: function (): Promise<ToRecord<BillingInfo>[]> {
    throw new Error("Function not implemented.");
  },
  delete: function (): Promise<ToRecord<BillingInfo>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function (): Promise<ToRecord<BillingInfo>[]> {
    throw new Error("Function not implemented.");
  },
};

const mapToBillingInfo = (
  data: BillingInfo[],
  appId: string,
  startDate: Date,
  currentDate: Date
) => {
  return {
    start_time: startDate,
    end_time: currentDate,
    computed_price: data.reduce(
      (sum, billingInfo) => sum + billingInfo.computed_price!,
      0
    ),
    id: appId,
  } as ToRecord<BillingInfo>;
};
