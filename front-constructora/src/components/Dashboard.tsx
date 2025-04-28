import { ReactNode, useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { MenuItemTypes } from "./../interfaces/MenuItemTypes";
import DashboardAppBarProps from "./DashboardAppBar";
import DashboardContent from "./DashboardContent";

interface DashboardProps {
  children: ReactNode;
  navItems: MenuItemTypes[];
}

const drawerWidth = 200;
const collapsedWidth = 72;

const DashboardLayout = ({ children, navItems }: DashboardProps) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <DashboardAppBarProps toggleDrawer={toggleDrawer} />

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
          "& .css-1lwhjos-MuiPaper-root-MuiDrawer-paper": {
            backgroundColor: "white",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ marginTop: 45 }}
        >
          <DashboardIcon style={{ width: 50, height: 50, color: "gray" }} />
          <Typography
            variant="h6"
            textAlign="center"
            mb={3}
            sx={{ color: "#000" }}
          >
            {open && <ListItemText primary={"Constructora Atlas"} />}
          </Typography>
        </Box>

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
                        backgroundColor: "#f5b041", // Color de hover seleccionado
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

      <DashboardContent children={children} />
    </Box>
  );
};
export default DashboardLayout;
