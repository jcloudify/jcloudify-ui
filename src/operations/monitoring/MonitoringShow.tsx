import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";
import {Stack} from "@mui/material";
import {useRef, useState} from "react";
import {InvocationSummaryChart, PerformanceMetricsChart} from "./charts";

const data = {
  Label: "Duration",
  Datapoints: [
    {
      Timestamp: "2024-06-20T10:00:00Z",
      Sum: 105000,
      SampleCount: 120,
      Minimum: 120,
      Maximum: 4500,
      Average: 875,
      ExtendedStatistics: {
        p20: 700,
        p50: 850,
        p95: 2000,
        p99: 4400,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:01:00Z",
      Sum: 110000,
      SampleCount: 125,
      Minimum: 150,
      Maximum: 4200,
      Average: 880,
      ExtendedStatistics: {
        p20: 710,
        p50: 860,
        p95: 2050,
        p99: 4300,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:02:00Z",
      Sum: 115000,
      SampleCount: 130,
      Minimum: 100,
      Maximum: 4600,
      Average: 885,
      ExtendedStatistics: {
        p20: 720,
        p50: 870,
        p95: 2100,
        p99: 4500,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:03:00Z",
      Sum: 120000,
      SampleCount: 135,
      Minimum: 110,
      Maximum: 4700,
      Average: 890,
      ExtendedStatistics: {
        p20: 730,
        p50: 880,
        p95: 2150,
        p99: 4600,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:04:00Z",
      Sum: 125000,
      SampleCount: 140,
      Minimum: 130,
      Maximum: 4800,
      Average: 895,
      ExtendedStatistics: {
        p20: 740,
        p50: 890,
        p95: 2200,
        p99: 4700,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:05:00Z",
      Sum: 130000,
      SampleCount: 145,
      Minimum: 140,
      Maximum: 4900,
      Average: 900,
      ExtendedStatistics: {
        p20: 750,
        p50: 900,
        p95: 2250,
        p99: 4800,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:06:00Z",
      Sum: 135000,
      SampleCount: 150,
      Minimum: 120,
      Maximum: 5000,
      Average: 905,
      ExtendedStatistics: {
        p20: 760,
        p50: 910,
        p95: 2300,
        p99: 4900,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:70:00Z",
      Sum: 140000,
      SampleCount: 155,
      Minimum: 110,
      Maximum: 5100,
      Average: 910,
      ExtendedStatistics: {
        p20: 770,
        p50: 920,
        p95: 2350,
        p99: 5000,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:08:00Z",
      Sum: 145000,
      SampleCount: 160,
      Minimum: 100,
      Maximum: 5200,
      Average: 915,
      ExtendedStatistics: {
        p20: 780,
        p50: 930,
        p95: 2400,
        p99: 5100,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:09:00Z",
      Sum: 150000,
      SampleCount: 165,
      Minimum: 90,
      Maximum: 5300,
      Average: 920,
      ExtendedStatistics: {
        p20: 790,
        p50: 940,
        p95: 2450,
        p99: 5200,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:10:00Z",
      Sum: 155000,
      SampleCount: 170,
      Minimum: 80,
      Maximum: 5400,
      Average: 925,
      ExtendedStatistics: {
        p20: 800,
        p50: 950,
        p95: 2500,
        p99: 5300,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:11:00Z",
      Sum: 160000,
      SampleCount: 175,
      Minimum: 70,
      Maximum: 5500,
      Average: 930,
      ExtendedStatistics: {
        p20: 810,
        p50: 960,
        p95: 2550,
        p99: 5400,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:12:00Z",
      Sum: 165000,
      SampleCount: 180,
      Minimum: 60,
      Maximum: 5600,
      Average: 935,
      ExtendedStatistics: {
        p20: 820,
        p50: 970,
        p95: 2600,
        p99: 5500,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:13:00Z",
      Sum: 170000,
      SampleCount: 185,
      Minimum: 50,
      Maximum: 5700,
      Average: 940,
      ExtendedStatistics: {
        p20: 830,
        p50: 980,
        p95: 2650,
        p99: 5600,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:14:00Z",
      Sum: 175000,
      SampleCount: 190,
      Minimum: 40,
      Maximum: 5800,
      Average: 945,
      ExtendedStatistics: {
        p20: 840,
        p50: 990,
        p95: 2700,
        p99: 5700,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:15:00Z",
      Sum: 180000,
      SampleCount: 195,
      Minimum: 30,
      Maximum: 5900,
      Average: 950,
      ExtendedStatistics: {
        p20: 850,
        p50: 1000,
        p95: 2750,
        p99: 5800,
      },
      Unit: "Milliseconds",
    },
    {
      Timestamp: "2024-06-20T10:16:00Z",
      Sum: 185000,
      SampleCount: 200,
      Minimum: 20,
      Maximum: 6000,
      Average: 955,
      ExtendedStatistics: {
        p20: 860,
        p50: 1010,
        p95: 2800,
        p99: 5900,
      },
      Unit: "Milliseconds",
    },
  ],
};

export const MonitoringShow: React.FC<{appId: string}> = ({appId}) => {
  return (
    <Stack mt={4} mb={3}>
      <GridLayout xs={12} lg={6} spacing={2}>
        <ContainerWithHeading title="Duration" headerColor="#fff">
          <PerformanceMetricsChart data={data} />
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
