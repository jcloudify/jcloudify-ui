import {useMemo} from "react";
import {LineChart, LineChartProps, axisClasses} from "@mui/x-charts";
import {ChartProps, Datapoint} from "@/operations/monitoring/types";
import {makeLineChartSeriesFromDatapoints} from "@/operations/monitoring/util";
import {colors} from "@/themes";

const settings: Partial<LineChartProps> = {
  yAxis: [{label: "Milliseconds (ms)"}],
  grid: {
    horizontal: true,
  },
  slotProps: {
    legend: {
      direction: "row",
      position: {
        horizontal: "right",
        vertical: "top",
      },
    },
  },
  height: 400,
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label} text`]: {
      transform: "rotate(0deg) translate(-10px, -180px)",
      textAnchor: "start",
      bottom: -90,
    },
    p: 0.5,
    bgcolor: colors("gray-0"),
  },
};

export const PerformanceMetricsChart: React.FC<ChartProps<Datapoint[]>> = ({
  data,
}) => {
  const timestamps = useMemo(
    () => data.map(({timestamp}) => new Date(timestamp)),
    [data]
  );

  const series = useMemo(() => makeLineChartSeriesFromDatapoints(data), [data]);

  return (
    <LineChart
      series={series}
      onAxisClick={() => {
        console.log("axis_click");
      }}
      xAxis={[
        {
          data: timestamps,
          scaleType: "time",
        },
      ]}
      {...settings}
    ></LineChart>
  );
};
