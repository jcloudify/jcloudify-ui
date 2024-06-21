import {Datapoint} from "@/operations/monitoring";

const generateSampleDatapoints = (
  startDate: Date,
  n: number,
  options: {baseResTime?: number; tinterval?: number} = {}
): Datapoint[] => {
  const data = [];
  const startTime = startDate.getTime();

  for (let i = 0; i < n; i++) {
    const timestamp = new Date(
      startTime + i * (options.tinterval || 1000 * 60)
    ).toISOString();
    const coldStartFactor = Math.max(0, 5 - i); // Higher for initial points, decreases over time
    const base = options.baseResTime || 230;

    const p20 = base + coldStartFactor * 100 + Math.random() * 100;
    const p45 = base + coldStartFactor * 90 + Math.random() * 100;
    const p50 = base + coldStartFactor * 80 + Math.random() * 100;
    const p90 = base + coldStartFactor * 200 + Math.random() * 200;

    data.push({
      timestamp: new Date(timestamp),
      p20,
      p45,
      p50,
      p90,
    });
  }
  return data;
};

export const datapoints1 = generateSampleDatapoints(
  new Date(2024, 0, 5),
  19 /* n */,
  {baseResTime: 220, tinterval: 1000 * 60 * 60 * 24}
);
