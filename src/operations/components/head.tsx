import {BooleanInput} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {TypoSizes, typoSizes} from "@/components/typo";

export interface TitleWithToggleProps {
  title: string;
  fieldSource: string;
  size?: TypoSizes;
}

export const TitleWithToggle: React.FC<TitleWithToggleProps> = ({
  title,
  fieldSource,
  size = "md",
}) => {
  const variant = typoSizes[size];
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant={variant.primary} fontWeight="450">
        {title}
      </Typography>
      <BooleanInput
        sx={{"& .MuiFormHelperText-root": {display: "none"}}}
        source={fieldSource}
        label=" "
        size="small"
      />
    </Stack>
  );
};
