import {colors} from "@/themes";
import {optional} from "@/utils/monad";
import {Stack, Paper, Button, ButtonProps} from "@mui/material";
import {useState} from "react";

export const DurationUnits = [
  "Months",
  "Weeks",
  "Days",
  "Hours",
  "Minutes",
  "Minutes",
] as const;

export interface Duration {
  value: number;
  unit: (typeof DurationUnits)[number];
}

export interface DurationInputProps {
  onChange?: (duration: Duration) => void;
}

const PredefinedDurations: (Duration & {id: number})[] = [
  {
    id: 1,
    value: 1,
    unit: "Hours",
  },
  {
    id: 2,
    value: 2,
    unit: "Hours",
  },
  {
    id: 3,
    value: 12,
    unit: "Hours",
  },
  {
    id: 4,
    value: 1,
    unit: "Days",
  },
  {
    id: 5,
    value: 2,
    unit: "Days",
  },
  {
    id: 6,
    value: 1,
    unit: "Weeks",
  },
];

interface DurationWithId extends Duration {
  id?: number;
}

const DurationButton: React.FC<
  {duration: DurationWithId; isSelected: boolean} & ButtonProps
> = ({duration, isSelected, ...rest}) => {
  const selectedSx = isSelected
    ? {
        bgcolor: colors("dark-0"),
        color: colors("gray-0"),
      }
    : {};
  return (
    <Button
      sx={{
        "borderRadius": "2px",
        ...selectedSx,
        ":hover": selectedSx,
        ...rest.sx,
      }}
      {...rest}
    >
      {duration.value + duration.unit[0].toLowerCase()}
    </Button>
  );
};

export const DurationInput: React.FC<DurationInputProps> = ({onChange}) => {
  const [duration, setDuration] = useState<DurationWithId>();
  return (
    <Stack component={Paper} direction="row">
      {PredefinedDurations.map((d) => (
        <DurationButton
          key={`duration-input-${d.id}`}
          duration={d}
          isSelected={duration?.id === d.id}
          onClick={() => {
            setDuration(d);
            optional(onChange).call(d);
          }}
        />
      ))}
    </Stack>
  );
};
