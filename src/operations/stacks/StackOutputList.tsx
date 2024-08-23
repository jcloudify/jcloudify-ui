import {StackOutput} from "@jcloudify-api/typescript-client";
import {
  List,
  Datagrid,
  ListProps,
  RaRecord,
  TextField,
  useGetOne,
  FunctionField,
} from "react-admin";
import {TypographyLink} from "@/components/link";
import {isValidURL} from "@/utils/url";

export type StackOutputListProps<Record extends RaRecord<string> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
> & {
  appId: string;
  stackId: string;
  envId: string;
};

export const StackOutputList: React.FC<StackOutputListProps> = ({
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
      resource="stackOutputs"
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
        <TextField source="key" />
        <FunctionField<StackOutput>
          label="Value"
          render={(output) => {
            return isValidURL(output.value!) ? (
              <TypographyLink
                to={output.value!}
                copiable={false}
                target="_blank"
              />
            ) : (
              <span>{output.value}</span>
            );
          }}
        />
        <TextField source="description" />
      </Datagrid>
    </List>
  );
};
