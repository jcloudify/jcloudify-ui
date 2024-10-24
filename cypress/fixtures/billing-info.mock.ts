import {BillingInfo} from "@jcloudify-api/typescript-client";

const currentDate = new Date("2024-09-10");
const startDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);

export const prod_billing_info: BillingInfo = {
  computed_price: 7.25,
  start_time: startDate,
  end_time: currentDate,
};

export const preprod_billing_info: BillingInfo = {
  computed_price: 1.63,
  start_time: startDate,
  end_time: currentDate,
};

export const app1_billing_info = [prod_billing_info, preprod_billing_info];

export const billingInfo: BillingInfo = {
  computed_price: app1_billing_info.reduce((s, b) => s + b.computed_price!, 0),
  start_time: startDate,
  end_time: currentDate,
};
