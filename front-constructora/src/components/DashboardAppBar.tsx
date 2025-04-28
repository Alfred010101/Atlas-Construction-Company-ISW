import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  LockReset as LockResetIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";

interface DashboardAppBarProps {
  toggleDrawer: () => void;
}

const DashboardAppBar: React.FC<DashboardAppBarProps> = ({ toggleDrawer }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      label: "Perfil",
      icon: <PersonIcon />,
      action: () => logout(),
    },
    {
      label: "Actualizar Contraseña",
      icon: <LockResetIcon />,
      action: () => logout(),
    },
    {
      label: "Salir",
      icon: <ExitToAppIcon />,
      action: () => logout(),
    },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300,
        backgroundColor: "#1abc9c",
        height: 40,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          paddingRight: "16px",
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{
            bottom: 12,
            "& svg": {
              fill: "#000",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box>
          <Tooltip title="Ajustes de usuario">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                bottom: 12,
                p: 0,
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s",
                },
              }}
            >
              <Avatar
                alt="Usuario"
                src="/static/images/avatar/2.jpg"
                sx={{
                  width: 35,
                  height: 35,
                  border: "2px solid white",
                }}
              />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "22px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            PaperProps={{
              elevation: 3,
              sx: {
                minWidth: 200,
                borderRadius: 2,
                "& .MuiMenuItem-root": {
                  px: 2,
                  py: 1,
                },
              },
            }}
          >
            {settings.map(({ label, icon, action }) => (
              <MenuItem
                key={label}
                onClick={() => {
                  handleCloseUserMenu();
                  action();
                  navigate("/login");
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "#CCC",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>{icon}</ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: label === "Salir" ? "bold" : "normal",
                    color: label === "Salir" ? "error.main" : "inherit",
                  }}
                >
                  {label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppBar;
