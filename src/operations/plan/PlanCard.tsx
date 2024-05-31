import {MouseEvent} from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {Check as CheckIcon} from "@mui/icons-material";
import {colors} from "@/themes";
import {Plan} from "./constant";

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
      data-testid={`plan-${plan.id}-card`}
    >
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h5">${cost} / month</Typography>
      </CardContent>
    </Card>
  );
};

export const PlanCardDetails: React.FC<PlanCardProps> = ({
  plan,
  isActive,
  onClick,
}) => {
  const {cost, description, details, name} = plan;
  return (
    <Card
      sx={{
        width: "320px",
        mt: 1,
        cursor: "pointer",
        bgcolor: isActive ? colors("gray-0") : colors("light"),
        borderRadius: 2,
      }}
      onClick={(e) => {
        onClick(e, plan);
      }}
    >
      <CardContent
        sx={{
          color: colors("light"),
          bgcolor: colors("dark-0"),
          mb: 1,
          borderBottomRightRadius: 70,
        }}
      >
        <Box>
          <Box sx={{mb: 2}}>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body1">{description}</Typography>
          </Box>
          <Box>
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <Typography variant="h4">${cost}</Typography>
              <Typography variant="body1">/ month</Typography>
            </Stack>
            <Typography variant="body2">billed once yearly</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box>
          <Typography variant="h6">Standout features</Typography>
          <List>
            {details.map((detail, index) => (
              <ListItem key={`pla-detail-${index}`} disablePadding>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary={detail} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};
