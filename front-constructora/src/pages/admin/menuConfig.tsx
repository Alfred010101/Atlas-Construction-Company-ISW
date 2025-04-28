import { MenuItemTypes } from "../../interfaces/MenuItemTypes";
import {
  Construction as ConstructionIcon,
  Warehouse as WarehouseIcon,
  Person3 as Person3Icon,
  Assessment as AssessmentIcon,
  LocalShipping as LocalShippingIcon,
  PendingActions as PendingActionsIcon,
} from "@mui/icons-material";

export const useMenuConfig = () => {
  const getNavItems = (): MenuItemTypes[] => [
    {
      label: "Empleados",
      icon: <Person3Icon />,
      path: "/admin/employees",
    },
    {
      label: "Proyectos",
      icon: <ConstructionIcon />,
      path: "/admin/projects",
    },
    {
      label: "Almacenes",
      icon: <WarehouseIcon />,
      path: "/admin/warehouses",
    },
    {
      label: "Proveedores",
      icon: <LocalShippingIcon />,
      path: "/admin/suppliers",
    },
    { label: "Stock", icon: <PendingActionsIcon />, path: "/admin/stock" },
    {
      label: "Reportes",
      icon: <AssessmentIcon />,
      path: "/reports",
    },
  ];

  return {
    navItems: getNavItems(),
  };
};
