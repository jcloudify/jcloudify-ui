import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(relative);
dayjs.extend(isBetween);

export const fromToNow = (date: Date | number | string) => {
  return dayjs().to(dayjs(date));
};

export type IsBetweenTerminal = "incl" | "excl";

export const isDateBetween = (
  date: Date,
  a: Date | undefined,
  b: Date | undefined,
  t: IsBetweenTerminal
) => {
  const d = dayjs(date);

  const incl = t === "incl";

  if (a && b) {
    return dayjs(date).isBetween(a, b, "date", incl ? "[]" : "()");
  }

  if (a) {
    return d.isAfter(a) || !incl || d.isSame(a);
  }

  if (b) {
    return d.isBefore(b) || !incl || d.isSame(b);
  }

  return false;
};
