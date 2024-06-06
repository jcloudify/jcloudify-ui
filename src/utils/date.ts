import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";

dayjs.extend(relative);

export const fromToNow = (date: Date | number | string) => {
  return dayjs().to(dayjs(date));
};
