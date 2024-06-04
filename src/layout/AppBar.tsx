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
  Stack,
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
            src={user.avatar}
            sx={{
              height: 20,
              width: 20,
            }}
          />
        }
      >
        <Stack
          px={2}
          py={1}
          direction="row"
          alignItems="flex-start"
          spacing={1}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 40,
              width: 40,
            }}
          />
          <Stack>
            <Typography color="primary" fontWeight="560" flex={1}>
              {user.username}
            </Typography>

            <Typography color="text.secondary" fontWeight="400">
              {user.email}
            </Typography>

            <Box mt={0.5}>
              <Chip label={user.role} size="small" color="primary" />
            </Box>
          </Stack>
        </Stack>

        <Box px={2} pb={1}></Box>

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
