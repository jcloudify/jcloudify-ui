import {BillingInfo} from "@jcloudify-api/typescript-client";
import {billingApi, unwrap} from "@/services/poja-api";
import {authProvider} from "@/providers";
import {PojaDataProvider, ToRecord} from "@/providers/types";

export const billingInfoProvider: PojaDataProvider<ToRecord<BillingInfo>> = {
  getOne: async (targetId, meta = {}) => {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    switch (meta.targetResource) {
      case "application":
        const userAppBillingInfo = await unwrap(() =>
          billingApi().getUserApplicationBillingInfo(
            uid,
            targetId,
            startDate,
            currentDate
          )
        );
        return mapToBillingInfo(
          userAppBillingInfo,
          targetId,
          startDate,
          currentDate
        );
      case "environment":
        const envBillingInfo = (await unwrap(() =>
          billingApi().getUserAppEnvironmentBillingInfo(
            uid,
            meta.appId,
            targetId,
            startDate,
            currentDate
          )
        )) as ToRecord<BillingInfo>;
        return {...envBillingInfo, id: targetId};
      default:
        const billingInfo = (await unwrap(() =>
          billingApi().getUserBillingInfo(uid, startDate, currentDate)
        )) as ToRecord<BillingInfo>;
        return {...billingInfo, id: targetId};
    }
  },
  getList: () => {
    throw new Error("Function not implemented.");
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

const mapToBillingInfo = (
  billingInfos: BillingInfo[],
  appId: string,
  startDate: Date,
  currentDate: Date
) => {
  return {
    start_time: startDate,
    end_time: currentDate,
    computed_price: billingInfos.reduce(
      (sum, billingInfo) => sum + billingInfo.computed_price!,
      0
    ),
    id: appId,
  } as ToRecord<BillingInfo>;
};
