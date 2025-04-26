import React, { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  LockReset as LockResetIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import Person3Icon from "@mui/icons-material/Person3";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useAuth } from "./../context/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const drawerWidth = 200;
const collapsedWidth = 72;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(true);
  const location = useLocation();

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
      icon: <PersonIcon fontSize="small" />,
      action: () => logout(),
    },
    {
      label: "Actualizar Contraseña",
      icon: <LockResetIcon fontSize="small" />,
      action: () => logout(),
    },
    {
      label: "Salir",
      icon: <ExitToAppIcon fontSize="small" />,
      action: () => logout(),
    },
  ];

  const toggleDrawer = () => setOpen(!open);

  const navItems = [
    { label: "Empleados", icon: <Person3Icon />, path: "/admin/employees" },
    { label: "Projectos", icon: <ConstructionIcon />, path: "/admin/projects" },
    { label: "Almacenes", icon: <WarehouseIcon />, path: "/admin/warehouses" },
    {
      label: "Proveedores",
      icon: <LocalShippingIcon />,
      path: "/admin/suppliers",
    },
    { label: "Stock", icon: <PendingActionsIcon />, path: "/admin/stock" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Tooltip
          key={"Constructora Atlas"}
          title={"Constructora Atlas"}
          placement="right"
          disableHoverListener={open}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <DashboardIcon style={{ width: 45, height: 45 }} />
            <Typography
              variant="h6"
              textAlign="center"
              mb={3}
              sx={{ color: "#000" }}
            >
              {open && <ListItemText primary={"Constructora Atlas"} />}
            </Typography>
          </Box>
        </Tooltip>
        <List>
          {navItems.map(({ label, icon, path }) => {
            const selected = location.pathname === path;
            return (
              <Tooltip
                key={label}
                title={label}
                placement="right"
                disableHoverListener={open}
              >
                <ListItemButton
                  component={NavLink}
                  to={path}
                  selected={selected}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    // Estilos para cuando NO está seleccionado
                    "&:not(.Mui-selected)": {
                      //color: theme.palette.text.secondary,
                      "&:hover": {
                        backgroundColor: "#f9e79f", // Color de hover no seleccionado
                      },
                    },
                    // Estilos para cuando SÍ está seleccionado
                    "&.Mui-selected": {
                      backgroundColor: "#f5b041",
                      color: "white", // Color de texto seleccionado
                      "&:hover": {
                        backgroundColor: "#16a085", // Color de hover seleccionado
                      },
                      // Estilo para el icono cuando está seleccionado
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                    },
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={label} />}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: 0,
          transition: "margin 0.7s",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
