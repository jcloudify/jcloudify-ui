import {IconButtonWithTooltip} from "react-admin";
import {ArrowBack} from "@mui/icons-material";

export const BackButton = () => {
  return (
    <IconButtonWithTooltip label="back" onClick={() => history.back()}>
      <ArrowBack />
    </IconButtonWithTooltip>
  );
};
