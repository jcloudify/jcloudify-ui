import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import {Inbox, Add, SvgIconComponent} from "@mui/icons-material";
import {
  useTranslate,
  useResourceContext,
  useGetResourceLabel,
  Link,
  Button,
} from "react-admin";

export const Empty = (props: EmptyProps) => {
  const {className, createRoute, icon: Icon = Inbox} = props;
  const resource = useResourceContext(props);

  const translate = useTranslate();

  const getResourceLabel = useGetResourceLabel();
  const resourceName = translate(`resources.${resource}.forcedCaseName`, {
    smart_count: 0,
    _: getResourceLabel(resource, 0),
  });

  const emptyMessage = translate("ra.page.empty", {name: resourceName});
  const inviteMessage = translate("ra.page.invite");

  return (
    <Root className={className}>
      <div className={EmptyClasses.message}>
        <Icon className={EmptyClasses.icon} />

        <Typography variant="h4" paragraph>
          {translate(`resources.${resource}.empty`, {
            _: emptyMessage,
          })}
        </Typography>
        {createRoute && (
          <Typography variant="body1">
            {translate(`resources.${resource}.invite`, {
              _: inviteMessage,
            })}
          </Typography>
        )}
      </div>
      {createRoute && (
        <div className={EmptyClasses.toolbar}>
          <Button
            label="Create"
            startIcon={<Add />}
            variant="contained"
            to="create/new"
            component={Link}
          />
        </div>
      )}
    </Root>
  );
};

export interface EmptyProps {
  createRoute?: React.ReactNode;
  resource?: string;
  className?: string;
  icon?: SvgIconComponent;
}

const PREFIX = "JcEmpty";

export const EmptyClasses = {
  message: `${PREFIX}-message`,
  icon: `${PREFIX}-icon`,
  toolbar: `${PREFIX}-toolbar`,
};

const Root = styled("span", {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({theme}) => ({
  flex: 1,
  [`& .${EmptyClasses.message}`]: {
    textAlign: "center",
    opacity: theme.palette.mode === "light" ? 0.5 : 0.8,
    margin: "0 1em",
    color:
      theme.palette.mode === "light" ? "inherit" : theme.palette.text.primary,
  },

  [`& .${EmptyClasses.icon}`]: {
    width: "9em",
    height: "9em",
  },

  [`& .${EmptyClasses.toolbar}`]: {
    textAlign: "center",
    marginTop: "2em",
  },
}));
