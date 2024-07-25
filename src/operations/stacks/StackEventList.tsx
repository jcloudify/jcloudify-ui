import {Stack} from "@jcloudify-api/typescript-client";
import {
  List,
  Datagrid,
  ListProps,
  RaRecord,
  TextField,
  useGetOne,
} from "react-admin";
import {ToRecord} from "@/providers";

export type StackEventListProps<Record extends RaRecord<string> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
> & {
  appId: string;
  stackId: string;
};

export const StackEventList: React.FC<StackEventListProps> = ({
  appId,
  stackId,
  ...rest
}) => {
  const {data: stack} = useGetOne<ToRecord<Stack>>("stacks", {id: stackId});
  return (
    <List
      resource="stacks"
      empty={false}
      filter={{
        appId,
        stackId,
        envId: stack?.environment?.id,
      }}
      {...rest}
    >
      <Datagrid rowClick={(id) => id.toString()} bulkActionButtons={false}>
        <TextField source="timestamp" />
        <TextField label="logical ID" source="logical_resource_id" />
        <TextField label="Status" source="resource_status" />
        <TextField label="Status reason" source="status_message" />
      </Datagrid>
    </List>
  );
};
