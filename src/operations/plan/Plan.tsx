import {MouseEvent, useEffect, useState} from "react";
import {Box, Stack} from "@mui/material";
import {PlanCardDetails} from "./PlanCard";
import {Plan, planList} from "./constant";

export interface SelectPlanProps {
  onSelect: (plan: Plan) => void;
}

export const SelectPlan: React.FC<SelectPlanProps> = ({onSelect}) => {
  const [activePlan, setActivePlan] = useState(planList[0].name);

  useEffect(() => {
    onSelect(planList[0]);
  }, []);

  const handleClick = (_ev: MouseEvent<HTMLDivElement>, plan: Plan) => {
    setActivePlan(plan.name!);
    onSelect(plan);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {planList.map((plan) => (
          <PlanCardDetails
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
