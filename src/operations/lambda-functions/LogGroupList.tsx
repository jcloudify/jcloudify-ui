import {Stack} from "@jcloudify-api/typescript-client";
import {
  List,
  Datagrid,
  ListProps,
  RaRecord,
  TextField,
  FunctionField,
} from "react-admin";
import {StackType} from "@/operations/stacks";
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
        rowClick={(_id, _resource, logGroup) =>
          `/applications/${appId}/show/environments/${envId}/functions/${functionName}/log-groups/${logGroup.name!}/streams`
        }
      >
        <TextField label="Stack name" source="name" />
        <FunctionField<Stack>
          label="Stack type"
          render={(stack) => <StackType value={stack.stack_type!} />}
        />
        <FunctionField<Stack>
          label="Creation datetime"
          render={(stack) => stack.creation_datetime?.toLocaleString()}
        />
        <FunctionField<Stack>
          label="Update datetime"
          render={(stack) => stack.update_datetime?.toLocaleString()}
        />
      </Datagrid>
    </List>
  );
};
