import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Card, CardContent, Typography} from "@mui/material";
import {Plan} from "@jcloudify-api/typescript-client";
import {POJA_COLORS} from "@/themes";

interface PlanCardProps {
  plan: Plan;
  // isActive: boolean;
  activePlan: string;
  setActivePlan: Dispatch<SetStateAction<string>>;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  activePlan,
  setActivePlan,
}) => {
  const {name, cost} = plan;
  const [borderColor, setBorderColor] = useState("grey");

  useEffect(() => {
    if (activePlan === name) {
      setBorderColor(POJA_COLORS["dark-0"]);
    } else {
      setBorderColor("grey");
    }
  }, [activePlan]);

  return (
    <Card
      variant="outlined"
      sx={{
        width: "280px",
        cursor: "pointer",
        borderColor: borderColor,
      }}
      onClick={() => {
        setActivePlan(name!);
      }}
    >
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h5">${cost} / month</Typography>
      </CardContent>
    </Card>
  );
};
