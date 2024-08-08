import {Stack, Box, Typography} from "@mui/material";
import {GridLayout} from "@/components/grid";
import {Divider} from "@/components/divider";
import {colors} from "@/themes";
import {useMemo} from "react";

export interface RecordShowProps {
  kvLabels?: [string, string];
  record: Record<string, string>;
  name?: string;
}

export const RecordShow: React.FC<RecordShowProps> = ({
  record,
  name = "key_values",
  kvLabels = ["Key", "Value"],
}) => {
  const keys = useMemo(() => Object.keys(record), [record]);

  return (
    <Stack direction="column" p={1} gap={1.5}>
      <Box>
        <GridLayout xs={4} spacing={2}>
          <Typography variant="body1" fontWeight="450">
            {kvLabels[0]}
          </Typography>
          <Typography variant="body1" fontWeight="450">
            {kvLabels[1]}
          </Typography>
        </GridLayout>
      </Box>

      <Divider sx={{mb: 2, borderColor: colors("gray-0")}} />

      {keys.map((key, idx) => {
        return (
          <GridLayout key={key + idx} xs={4} spacing={2}>
            <Typography
              variant="body1"
              fontWeight="400"
              id={`${name}-${idx}-key`}
            >
              {key}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="400"
              id={`${name}-${idx}-value`}
            >
              {record[key]}
            </Typography>
          </GridLayout>
        );
      })}
    </Stack>
  );
};
