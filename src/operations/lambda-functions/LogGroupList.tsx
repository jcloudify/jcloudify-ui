import {LogGroup} from "@jcloudify-api/typescript-client";
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

export type LogGroupListProps<Record extends RaRecord<string> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
> & {
  appId: string;
  envId: string;
  functionName: string;
};

export const LogGroupList: React.FC<LogGroupListProps> = ({
  appId,
  envId,
  functionName,
  ...rest
}) => {
  return (
    <List
      resource="logGroups"
      queryOptions={{
        onError: NO_OP,
      }}
      empty={false}
      filter={{
        appId,
        envId,
        functionName: parseFunctionNameParams(functionName).name,
      }}
      {...rest}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(_id, _resource, logGroup) =>
          `/applications/${appId}/show/logs/environments/${envId}/functions/${functionName}/log-groups/${encodeURIComponent(logGroup.name!)}/streams`
        }
      >
        <TextField source="name" />
        <FunctionField<LogGroup>
          label="Creation datetime"
          render={(logGroup) => logGroup.creation_datetime?.toLocaleString()}
        />
      </Datagrid>
    </List>
  );
};
