import React, {ReactNode} from "react";
import {Button, useTranslate} from "react-admin";
import {
  Theme,
  Box,
  List,
  ListItemIcon,
  MenuItem,
  Typography,
  Collapse,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {ExpandMore, ArrowRightOutlined} from "@mui/icons-material";
import {optional} from "@/utils/monad";

const sx = {
  icon: (theme: Theme) => ({minWidth: theme.spacing(5)}),
  sidebarIsOpen: (theme: Theme) => ({
    "& a": {
      transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      paddingLeft: theme.spacing(4),
    },
  }),
  sidebarIsClosed: (theme: Theme) => ({
    "& a": {
      transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      paddingLeft: theme.spacing(2),
    },
  }),
  actionIcon: {
    opacity: 0,
  },
  menuHeader: {
    width: "100%",
  },
  headerWrapper: {
    "display": "flex",
    "&:hover $actionIcon": {
      opacity: 1,
    },
  },
};

export interface SubMenuProps {
  handleToggle: () => void;
  name: string;
  icon: ReactNode;
  children: ReactNode;
  onAction?: React.MouseEventHandler;
  actionIcon?: ReactNode;
  dense?: boolean;
  isOpen?: boolean;
  sidebarIsOpen?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({
  handleToggle,
  name,
  icon,
  children,
  onAction,
  actionIcon = <ArrowRightOutlined fontSize={"small"} />,
  dense = false,
  sidebarIsOpen = false,
  isOpen = false,
}) => {
  const translate = useTranslate();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    optional(onAction).call(e);
    // if (isSmall) {
    //   dispatch(setSidebarVisibility(false))
    // }
  };

  const header = (
    <Box sx={sx.headerWrapper}>
      <MenuItem dense={dense} sx={sx.menuHeader} onClick={handleToggle}>
        <ListItemIcon sx={sx.icon}>
          {isOpen ? <ExpandMore /> : icon}
        </ListItemIcon>
        <Typography variant="inherit" color="textSecondary">
          {translate(name)}
        </Typography>
        {onAction && sidebarIsOpen && (
          <IconButton
            size={"small"}
            sx={isDesktop ? sx.actionIcon : null}
            onClick={handleOnClick}
          >
            {actionIcon}
          </IconButton>
        )}
      </MenuItem>
    </Box>
  );

  return (
    <React.Fragment>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        <Tooltip title={translate(name)} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          sx={sidebarIsOpen ? sx.sidebarIsOpen : sx.sidebarIsClosed}
        >
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default SubMenu;
