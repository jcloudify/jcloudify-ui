import {LogStreamEvent} from "@jcloudify-api/typescript-client";
import {
  List,
  Datagrid,
  ListProps,
  RaRecord,
  TextField,
  FunctionField,
} from "react-admin";
import {NO_OP} from "@/utils/no-op";
import {parseFunctionNameParams} from "@/operations/lambda-functions/util";

export type LogStreamEventListProps<Record extends RaRecord<string> = any> =
  Omit<ListProps<Record>, "resource" | "children"> & {
    appId: string;
    envId: string;
    functionName: string;
    logGroupName: string;
    logStreamName: string;
  };

export const LogStreamEventList: React.FC<LogStreamEventListProps> = ({
  appId,
  envId,
  functionName,
  logGroupName,
  logStreamName,
  ...rest
}) => {
  return (
    <List
      resource="logStreamEvents"
      queryOptions={{
        onError: NO_OP,
      }}
      empty={false}
      filter={{
        appId,
        envId,
        functionName: parseFunctionNameParams(functionName).name,
        logGroupName,
        logStreamName,
      }}
      {...rest}
    >
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <FunctionField<LogStreamEvent>
          label="Timestamp"
          render={(logStreamEvent) =>
            logStreamEvent.timestamp?.toLocaleString()
          }
        />
        <TextField source="message" />
      </Datagrid>
    </List>
  );
};
