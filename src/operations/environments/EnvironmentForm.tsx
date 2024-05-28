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
import {Add as AddIcon} from "@mui/icons-material";
import {EnvironmentType} from "@jcloudify-api/typescript-client";
import {SelectPlan} from "../plan";
import {ContainerWithHeading} from "@/components/container";

export const EnvironmentForm: React.FC = () => {
  const plans = [
    {
      name: "Hobby",
      cost: 0,
    },
    {
      name: "Pro",
      cost: 15,
    },
  ];

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
          <SelectPlan plans={plans} onSelect={() => {}} />
        </Box>
        <Box>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create Env
          </Button>
        </Box>
      </Stack>
    </ContainerWithHeading>
  );
};
