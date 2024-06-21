import {Stack} from "@mui/material";
import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";
import {
  InvocationSummaryChart,
  PerformanceMetricsChart,
} from "@/operations/monitoring/charts";
import {datapoints1} from "#/monitoring.mock";

export const MonitoringShow: React.FC<{appId: string}> = () => {
  return (
    <Stack mt={4} mb={3}>
      <GridLayout xs={12} lg={6} spacing={2}>
        <ContainerWithHeading title="Duration" headerColor="#fff">
          <PerformanceMetricsChart data={datapoints1} />
        </ContainerWithHeading>

        <ContainerWithHeading title="Invocation" headerColor="#fff">
          <InvocationSummaryChart
            data={{
              "2XX": 97,
              "5XX": 3,
              "timestamp": new Date(2024, 0, 1, 10, 0, 0),
            }}
          />
        </ContainerWithHeading>
      </GridLayout>
    </Stack>
  );
};
