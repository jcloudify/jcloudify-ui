import {ChartProps, InvocationSummaryData} from "@/operations/monitoring/types";
import {red, green} from "@mui/material/colors";
import {PieChart} from "@mui/x-charts";

export const InvocationSummaryChart: React.FC<
  ChartProps<InvocationSummaryData>
> = ({data}) => {
  return (
    <PieChart
      series={[
        {
          data: [
            {
              id: 0,
              value: data["2XX"],
              label: "2XX",
              color: green[300],
            },
            {
              id: 1,
              value: data["5XX"],
              label: "5XX",
              color: red[700],
            },
          ],
          highlightScope: {faded: "global", highlighted: "item"},
          faded: {innerRadius: 30, additionalRadius: -30, color: "gray"},
          valueFormatter: ({value: percent}) => percent + "%",
        },
      ]}
      height={400}
    />
  );
};
