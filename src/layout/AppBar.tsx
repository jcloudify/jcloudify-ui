import React from "react";
import {
  AppBarProps as RAAppBarProps,
  AppBar as RAAppBar,
  UserMenu as RAUserMenu,
  useLogout,
} from "react-admin";
import {
  Box,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import {Logout as LogoutIcon} from "@mui/icons-material";
import {authProvider} from "@/providers";

const UserMenu: React.FC = () => {
  const logout = useLogout();
  const {user} = authProvider.getCachedWhoami()!;

  if (!user) return null;

  return (
    <Box data-testid="user_menu">
      <RAUserMenu
        icon={
          <Avatar
            sx={{
              height: 20,
              width: 20,
            }}
          />
        }
      >
        <Typography color="primary" fontWeight="560" px={2} py={1}>
          {user.username}
        </Typography>

        <Typography color="text.secondary" fontWeight="500" px={2} pb={1}>
          {user.email}
        </Typography>

        <Box px={2} pb={1}>
          <Chip label={user.role} size="small" color="primary" />
        </Box>

        <Divider sx={{mb: 1}} />

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Log Out</ListItemText>
        </MenuItem>
      </RAUserMenu>
    </Box>
  );
};

// open to cusomization
export const AppBar: React.FC<RAAppBarProps> = (props) => {
  return <RAAppBar {...props} userMenu={<UserMenu />} />;
};
