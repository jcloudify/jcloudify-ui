import {MouseEvent, useState} from "react";
import {Box, Stack} from "@mui/material";
import {PlanCard} from "./PlanCard";
import {Plan} from "@jcloudify-api/typescript-client";

export interface PlanViewProps {
  plans: Plan[];
  onSelect: (plan: Plan) => void;
}

export const PlanView: React.FC<PlanViewProps> = ({plans, onSelect}) => {
  const [activePlan, setActivePlan] = useState(plans[0].name!);

  const handleClick = (_ev: MouseEvent<HTMLDivElement>, plan: Plan) => {
    setActivePlan(plan.name!);
    onSelect(plan);
  };

  return (
    <Box sx={{mx: "auto"}}>
      <Stack direction="row" spacing={2}>
        {plans.map((plan) => (
          <PlanCard
            plan={plan}
            onClick={handleClick}
            isActive={activePlan === plan.name!}
            key={plan.id}
          />
        ))}
      </Stack>
    </Box>
  );
};
