import {Box, Stack} from "@mui/material";
import {PlanCard} from "./PlanCard";
import {Plan} from "@jcloudify-api/typescript-client";
import {useState} from "react";

export interface PlanViewProps {
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
            onClick={(_ev, plan) => setActivePlan(plan.name!)}
            isActive={activePlan === plan.name!}
            key={plan.id}
          />
        ))}
      </Stack>
    </Box>
  );
};
