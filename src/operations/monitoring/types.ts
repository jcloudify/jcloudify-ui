import {percentiles} from "./util";

export type ChartProps<TData> = {
  data: TData;
};

export interface InvocationSummaryData {
  "timestamp": Date;
  "2XX": number;
  "5XX": number;
}

export type Datapoint = {
  timestamp: Date;
} & {
  [k in Percentile]: number;
};

export type Percentile = (typeof percentiles)[number];
