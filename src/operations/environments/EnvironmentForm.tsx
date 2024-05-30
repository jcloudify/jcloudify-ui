import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import {Add as AddIcon, Close as CloseIcon} from "@mui/icons-material";
import {Environment, EnvironmentType} from "@jcloudify-api/typescript-client";
import {ContainerWithHeading} from "@/components/container";
import {SelectPlan} from "@/operations/plan";

export interface EnvironmentFormProps {
  onCancel: () => void;
  envList: Array<Environment>;
}

export const EnvironmentForm: React.FC<EnvironmentFormProps> = ({
  envList,
  onCancel,
}) => {
  return (
    <ContainerWithHeading title="Create Env">
      <Stack direction="column" spacing={2}>
        <Box>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="env-type"
              defaultValue={EnvironmentType.PROD}
            >
              <FormControlLabel
                value={EnvironmentType.PROD}
                control={<Radio />}
                label={EnvironmentType.PROD}
              />

              <FormControlLabel
                value={EnvironmentType.PREPROD}
                control={<Radio />}
                label={EnvironmentType.PREPROD}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="gray">
            Plan
          </Typography>
          <SelectPlan onSelect={() => {}} />
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create Env
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </ContainerWithHeading>
  );
};
