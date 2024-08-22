import {StackEvent} from "@jcloudify-api/typescript-client";
import {
  List,
  Datagrid,
  ListProps,
  RaRecord,
  TextField,
  useGetOne,
  FunctionField,
} from "react-admin";
import {StackResourceStatusType} from "@/operations/stacks";

export type StackEventListProps<Record extends RaRecord<string> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
> & {
  appId: string;
  stackId: string;
  envId: string;
};

export const StackEventList: React.FC<StackEventListProps> = ({
  appId,
  stackId,
  envId,
  ...rest
}) => {
  const {data: environments = []} = useGetOne("stacks", {
    id: stackId,
    meta: {
      appId,
      envId,
    },
  });

  return (
    <List
      resource="stackEvents"
      empty={false}
      filter={{
        appId,
        stack_id: stackId,
        env_id: envId,
      }}
      filterDefaultValues={{
        env_id: environments[0]?.id,
      }}
      {...rest}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="timestamp" />
        <TextField label="Logical ID" source="logical_resource_id" />
        <TextField label="Resource type" source="resource_type" />
        <FunctionField<StackEvent>
          label="Resource status"
          render={(stack) => (
            <StackResourceStatusType value={stack.resource_status!} />
          )}
        />
        <TextField label="Status reason" source="status_message" />
      </Datagrid>
    </List>
  );
};
