import {Box, Stack} from "@mui/material";
import {PlanCard} from "./PlanCard";
import {Plan} from "@jcloudify-api/typescript-client";
import {useState} from "react";

interface PlanViewProps {
  plans: Plan[];
}

export const PlanView: React.FC<PlanViewProps> = ({plans}) => {
  const [activePlan, setActivePlan] = useState(plans[0].name!);

  return (
    <Box sx={{mx: "auto"}}>
      <Stack direction="row" spacing={2}>
        {plans.map((plan) => (
          <PlanCard
            plan={plan}
            activePlan={activePlan}
            setActivePlan={setActivePlan}
          />
        ))}
      </Stack>
    </Box>
  );
};
