import {Stack} from "@jcloudify-api/typescript-client";
import {
  List,
  Datagrid,
  ListProps,
  RaRecord,
  TextField,
  FunctionField,
  SelectInput,
  Filter,
  required,
  useGetList,
} from "react-admin";
import {COMMON_RA_SELECT_INPUT_SX_PROPS} from "@/components/constants";
import {EnvironmentType} from "@/operations/environments";

export type StackListProps<Record extends RaRecord<string> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
> & {
  appId: string;
};

export const StackList: React.FC<StackListProps> = ({
  appId,
  queryOptions = {},
  ...rest
}) => {
  queryOptions.meta ||= {};

  const {data: environments = []} = useGetList("environments", {
    meta: {
      application_id: appId,
    },
  });

  return (
    <List
      resource="stacks"
      empty={false}
      filter={{
        appId,
      }}
      filterDefaultValues={{
        env_id: environments[0]?.id,
      }}
      actions={
        <Filter>
          <SelectInput
            alwaysOn
            label="Environment"
            source="env_id"
            validate={required()}
            choices={[...environments]}
            optionText={(environment) => (
              <EnvironmentType value={environment.environment_type!} />
            )}
            optionValue="id"
            variant="outlined"
            fullWidth
            sx={COMMON_RA_SELECT_INPUT_SX_PROPS}
          />
        </Filter>
      }
      {...rest}
    >
      <Datagrid rowClick={(id) => id.toString()} bulkActionButtons={false}>
        <TextField label="ID" source="id" />
        <TextField label="Stack name" source="name" />
        <TextField label="Stack type" source="stackType" />
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
