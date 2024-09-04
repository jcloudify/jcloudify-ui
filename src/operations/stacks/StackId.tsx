import {Stack} from "@jcloudify-api/typescript-client";
import {useGetOne} from "react-admin";
import {Typography} from "@mui/material";
import {ToRecord} from "@/providers";
import {StackType} from "@/operations/stacks";

export interface StackIdProps {
  appId: string;
  stackId: string;
  envId: string;
}

export const StackId: React.FC<StackIdProps> = ({appId, stackId, envId}) => {
  const {data: stack} = useGetOne<ToRecord<Stack>>("stacks", {
    id: stackId,
    meta: {
      appId,
      envId,
    },
  });

  if (!stack) return null;

  return (
    <Typography variant="h6" fontSize="1.02rem" fontWeight="400">
      <StackType value={stack.stack_type!} />
    </Typography>
  );
};
