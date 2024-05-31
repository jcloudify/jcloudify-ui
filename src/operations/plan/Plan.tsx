import {MouseEvent, useEffect, useState} from "react";
import {Box, Stack} from "@mui/material";
import {PlanCard} from "./PlanCard";
import {Plan} from "@jcloudify-api/typescript-client";

export interface SelectPlanProps {
  onSelect: (plan: Plan) => void;
}

export const SelectPlan: React.FC<SelectPlanProps> = ({onSelect}) => {
  const plans = [
    {
      id: "plan_1",
      name: "Hobby",
      cost: 0,
    },
    {
      id: "plan_2",
      name: "Pro",
      cost: 15,
    },
  ];

  const [activePlan, setActivePlan] = useState(plans[0].name!);

  useEffect(() => {
    onSelect(plans[0]);
  }, []);

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
