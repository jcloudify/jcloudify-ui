import {MouseEvent, useState} from "react";
import {Box, Stack} from "@mui/material";
import {PlanCard} from "./PlanCard";
import {Plan} from "@jcloudify-api/typescript-client";

export interface SelectPlanProps {
  plans: Plan[];
  onSelect: (plan: Plan) => void;
}

export const SelectPlan: React.FC<SelectPlanProps> = ({plans, onSelect}) => {
  const [activePlan, setActivePlan] = useState(plans[0].name!);

  const handleClick = (_ev: MouseEvent<HTMLDivElement>, plan: Plan) => {
    setActivePlan(plan.name!);
    onSelect(plan);
  };

  return (
    <Box>
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
