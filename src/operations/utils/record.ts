import {Identifier, RaRecord} from "react-admin";

export const getIds = (records: RaRecord<Identifier>[]) => {
  return records.map((record) => record.id);
};
