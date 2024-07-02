import {Stack, Toolbar, Tooltip, Select, MenuItem} from "@mui/material";
import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";
import {DurationInput} from "@/components/duration";
import {
  InvocationSummaryChart,
  PerformanceMetricsChart,
} from "@/operations/monitoring/charts";
import {genDatapoints} from "#/monitoring.mock";
import {colors} from "@/themes";
import {useMemo, useState} from "react";

export const MonitoringShow: React.FC<{appId: string}> = () => {
  const [tsInterval, setTsInterval] = useState(1000 * 60 * 30);

  const datapoints = useMemo(
    () =>
      genDatapoints(new Date(2024, 0, 5), 10 /* n */, {
        baseResTime: 210,
        tinterval: tsInterval,
      }),
    [tsInterval]
  );

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
        <Tooltip title="timestamp interval" placement="top">
          <span>
            <Select
              size="small"
              value={tsInterval}
              onChange={(ev) => {
                setTsInterval(+ev.target.value);
              }}
            >
              <MenuItem value={1000 * 60 * 30}>30 minutes</MenuItem>
              <MenuItem value={1000 * 60 * 60}>1 hour</MenuItem>
            </Select>
          </span>
        </Tooltip>

        <Tooltip title="last" placement="top-start">
          <span>
            <DurationInput
              onChange={(duration) => {
                console.log("duration", duration);
              }}
            />
          </span>
        </Tooltip>
      </Toolbar>

      <GridLayout xs={12} lg={6} spacing={2}>
        <ContainerWithHeading title="Duration" headerColor="#fff">
          <PerformanceMetricsChart data={datapoints} />
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
