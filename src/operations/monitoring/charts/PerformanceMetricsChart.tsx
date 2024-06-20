import {ms} from "@/utils/format";
import {LineChart, ChartsYAxis, ChartsXAxis} from "@mui/x-charts";
import {useMemo} from "react";

export const PerformanceMetricsChart: React.FC<{data: any}> = ({data}: any) => {
  const {Datapoints: datapoints} = data;

  const stats = useMemo(() => {
    const stats = ["p20", "p50", "p95", "p99", "average"].reduce((o, px) => {
      o[px] = [];
      return o;
    }, {} as any);
    datapoints.forEach(({ExtendedStatistics: dpStats, Average}: any) => {
      const {p20, p50, p95, p99} = dpStats;
      stats.p20.push(p20);
      stats.p50.push(p50);
      stats.p95.push(p95);
      stats.p99.push(p99);
      stats.average.push(Average);
    });
    return stats;
  }, []);

  const timestamps = useMemo(
    () => datapoints.map((dp: any) => new Date(dp.Timestamp)),
    [datapoints]
  );

  const msFormatter = (v: number | null) => ms(v!);

  return (
    <LineChart
      series={[
        {label: "p20", data: stats.p20, valueFormatter: msFormatter},
        {label: "p50", data: stats.p50, valueFormatter: msFormatter},
        {label: "p95", data: stats.p95, valueFormatter: msFormatter},
        {label: "p99", data: stats.p99, valueFormatter: msFormatter},
      ]}
      xAxis={[
        {
          data: timestamps,
          valueFormatter: (date: Date) => date.toLocaleTimeString(),
          scaleType: "point",
        },
      ]}
      height={400}
    ></LineChart>
  );
};
