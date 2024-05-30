import {useState} from "react";
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
import {EnvironmentType, Plan} from "@jcloudify-api/typescript-client";
import {ContainerWithHeading} from "@/components/container";
import {SelectPlan} from "@/operations/plan";

export interface EnvironmentCreateProps {
  onCancel: () => void;
  envTypeList: Array<EnvironmentType>;
}

export const EnvironmentCreate: React.FC<EnvironmentCreateProps> = ({
  envTypeList,
  onCancel,
}) => {
  const [_environmentPlan, setEnvironmentPlan] = useState<Plan>();
  const [environmentType, setEnvironmentType] = useState<string>(
    envTypeList.includes(EnvironmentType.PROD)
      ? EnvironmentType.PREPROD
      : EnvironmentType.PROD
  );

  return (
    <ContainerWithHeading title="Create Env">
      <Stack direction="column" spacing={2}>
        <Box>
          <FormControl>
            <FormLabel id="env-type-radio-label">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="env-type-radio-label"
              name="env-type"
              value={environmentType}
              onChange={(e) => setEnvironmentType(e.target.value)}
            >
              <FormControlLabel
                value={EnvironmentType.PROD}
                control={<Radio />}
                label={EnvironmentType.PROD}
                disabled={envTypeList.includes(EnvironmentType.PROD)}
              />

              <FormControlLabel
                value={EnvironmentType.PREPROD}
                control={<Radio />}
                label={EnvironmentType.PREPROD}
                disabled={envTypeList.includes(EnvironmentType.PREPROD)}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="gray">
            Plan
          </Typography>
          <SelectPlan
            onSelect={(plan) => {
              setEnvironmentPlan(plan);
            }}
          />
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
