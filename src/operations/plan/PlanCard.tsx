import {MouseEvent} from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {Plan} from "@jcloudify-api/typescript-client";
import {colors} from "@/themes";

interface PlanCardProps {
  plan: Plan;
  isActive: boolean;
  onClick: (ev: MouseEvent<HTMLDivElement>, plan: Plan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onClick,
  isActive,
}) => {
  const {name, cost} = plan;

  return (
    <Card
      variant="outlined"
      sx={{
        width: "280px",
        cursor: "pointer",
        borderColor: isActive ? colors("dark-0") : colors("gray-0"),
      }}
      onClick={(e) => {
        onClick(e, plan);
      }}
    >
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h5">${cost} / month</Typography>
      </CardContent>
    </Card>
  );
};
