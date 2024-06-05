import {faker as m} from "@faker-js/faker";
import {Log, LogLogTypeEnum} from "@jcloudify-api/typescript-client";

const log = (id: string): Required<Log> => ({
  id,
  log_datetime: m.date.past({years: 1, refDate: new Date()}),
  log_type: LogLogTypeEnum.APPLICATION_LOG,
  log_file_uri: "https://examplebucket.s3.eu-west-3.amazonaws.com/logfile",
});

export const log1 = {
  ...log("log1"),
  log_type: LogLogTypeEnum.APPLICATION_LOG,
};

export const log2 = {
  ...log("log2"),
  log_type: LogLogTypeEnum.DEPLOYMENT_LOG,
};

export const log3 = {
  ...log("log3"),
  log_type: LogLogTypeEnum.DEPLOYMENT_LOG,
};

export const log4 = {
  ...log("log4"),
  log_type: LogLogTypeEnum.DEPLOYMENT_LOG,
};

export const log5 = {
  ...log("log5"),
  log_type: LogLogTypeEnum.APPLICATION_LOG,
};

export const log6 = {
  ...log("log6"),
  log_type: LogLogTypeEnum.APPLICATION_LOG,
};

export const logs: Required<Log>[] = [log1, log2, log3, log4, log5, log6];
