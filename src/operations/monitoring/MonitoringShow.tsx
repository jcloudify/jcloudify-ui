import {Stack, Toolbar, Tooltip, Select, MenuItem} from "@mui/material";
import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";
import {DurationInput} from "@/components/duration";
import {
  InvocationSummaryChart,
  PerformanceMetricsChart,
} from "@/operations/monitoring/charts";
import {datapoints1} from "#/monitoring.mock";
import {colors} from "@/themes";

export const MonitoringShow: React.FC<{appId: string}> = () => {
  return (
    <Stack mt={4} mb={3} rowGap={2}>
      <Toolbar
        component={Stack}
        direction="row"
        spacing={2}
        sx={{
          bgcolor: "#fff",
          border: `1px solid ${colors("gray-1")}`,
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <Tooltip title="from" placement="top-start">
          <span>
            <Select size="small" value="30m">
              <MenuItem value="30m">30 minutes</MenuItem>
            </Select>
          </span>
        </Tooltip>

        <Tooltip title="from" placement="top-start">
          <span>
            <DurationInput />
          </span>
        </Tooltip>
      </Toolbar>

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
