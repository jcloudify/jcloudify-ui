import {EnvironmentRecord} from "./types";

export const environmentRecordToArray = (record: Record<string, string>) => {
  return Object.entries(record).map(([name, value]) => ({
    name,
    value,
    deleted: false,
    isNew: false,
  }));
};

export const environmentArrayToRecord = (
  arr: EnvironmentRecord[]
): Record<string, string> => {
  return arr.reduce(
    (result, record) => {
      if (!record.deleted) {
        result[record.name] = record.value;
      }
      return result;
    },
    {} as Record<string, string>
  );
};
