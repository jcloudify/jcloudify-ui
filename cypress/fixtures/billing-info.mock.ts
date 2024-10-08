import {BillingInfo} from "@jcloudify-api/typescript-client";

const currentDate = new Date();
const startDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);

export const app1_prod_billing_info: BillingInfo = {
  computed_price: 7.25,
  start_time: startDate,
  end_time: currentDate,
};

export const app1_preprod_billing_info: BillingInfo = {
  computed_price: 1.63,
  start_time: startDate,
  end_time: currentDate,
};

export const app1_billing_info = [
  app1_prod_billing_info,
  app1_preprod_billing_info,
];
