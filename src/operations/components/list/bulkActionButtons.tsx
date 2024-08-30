import {DELETE_RESOURCES, ToRecord} from "@/providers";
import {useMemo} from "react";
import {
  BulkDeleteWithConfirmButton,
  MutationMode,
  BulkDeleteWithConfirmButtonProps as RaBulkDeleteWithConfirmButtonProps,
  useListContext,
} from "react-admin";

export type BulkDeleteWithConfirmButtonProps = Omit<
  RaBulkDeleteWithConfirmButtonProps,
  "mutationMode"
> & {
  mutationMode?: MutationMode;
};

export const BulkDeleteButton = ({
  mutationMode = "pessimistic",
  confirmColor = "warning",
  mutationOptions,
  ...rest
}: BulkDeleteWithConfirmButtonProps) => {
  const {data = [], selectedIds} = useListContext<ToRecord<{}>>();

  const toDelete = useMemo(
    () => data.filter((record) => selectedIds.includes(record.id)),
    [data, selectedIds]
  );

  return (
    <BulkDeleteWithConfirmButton
      confirmColor={confirmColor}
      mutationMode={mutationMode}
      mutationOptions={{
        ...mutationOptions,
        meta: {
          [DELETE_RESOURCES]: toDelete,
          ...(mutationOptions?.meta || {}),
        },
      }}
      {...rest}
    />
  );
};
