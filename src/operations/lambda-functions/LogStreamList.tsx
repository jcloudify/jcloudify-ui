import {LogStream} from "@jcloudify-api/typescript-client";
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

export type LogStreamListProps<Record extends RaRecord<string> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
> & {
  appId: string;
  envId: string;
  functionName: string;
  logGroupName: string;
};

export const LogStreamList: React.FC<LogStreamListProps> = ({
  appId,
  envId,
  functionName,
  logGroupName,
  ...rest
}) => {
  return (
    <List
      resource="logStreams"
      queryOptions={{
        onError: NO_OP,
      }}
      empty={false}
      filter={{
        appId,
        envId,
        functionName: parseFunctionNameParams(functionName).name,
        logGroupName,
      }}
      {...rest}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(_id, _resource, logStream) =>
          `/applications/${appId}/show/logs/environments/${envId}/functions/${functionName}/log-groups/${encodeURIComponent(logGroupName)}/streams/${encodeURIComponent(logStream.name)}`
        }
      >
        <TextField source="name" />
        <FunctionField<LogStream>
          label="Creation datetime"
          render={(logStream) => logStream.creation_datetime?.toLocaleString()}
        />
        <FunctionField<LogStream>
          label="First event datetime"
          render={(logStream) =>
            logStream.first_event_datetime?.toLocaleString()
          }
        />
        <FunctionField<LogStream>
          label="Last event datetime"
          render={(logStream) =>
            logStream.last_event_datetime?.toLocaleString()
          }
        />
      </Datagrid>
    </List>
  );
};
