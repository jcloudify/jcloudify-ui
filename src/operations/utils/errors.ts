import {stripSuffix} from "@/utils/str";

export const make_error_entries_from_400_bad_request = (
  errorMessage: string
) => {
  const messages = errorMessage
    .split(/\.\s/)
    .filter((m) => !!m)
    .map((m) => stripSuffix(m, ".") + ".")
    .map((m) => {
      const splitted = m.split(" ");
      const source = splitted[0];
      return [source, splitted.slice(1).join(" ")];
    });
  return Object.fromEntries(messages);
};
