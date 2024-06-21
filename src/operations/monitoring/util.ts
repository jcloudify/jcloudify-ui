import {Datapoint} from "@/operations/monitoring/types";
import {LineSeriesType} from "@mui/x-charts";

export const percentiles = ["p20", "p45", "p50", "p90"] as const;

export const makeLineChartSeriesFromDatapoints = (
  datapoints: Datapoint[]
): Omit<LineSeriesType, "type">[] => {
  return percentiles.map((nth) => ({
    label: nth,
    data: datapoints.map((dp) => dp[nth]),
    valueFormatter: (t) => `${Math.round(t!)}ms`,
    showMark: false,
  }));
};
