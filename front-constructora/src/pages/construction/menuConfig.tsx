import { MenuItemTypes } from "../../interfaces/MenuItemTypes";
import {
  Construction as ConstructionIcon,
  Warehouse as WarehouseIcon,
  LocalShipping as LocalShippingIcon,
  Person3 as Person3Icon,
  PendingActions as PendingActionsIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

export const useMenuConfig = () => {
  const getNavItems = (): MenuItemTypes[] => [
    {
      label: "Empleados",
      icon: <Person3Icon />,
      path: "/employees",
    },
    {
      label: "Proyectos",
      icon: <ConstructionIcon />,
      path: "/projects",
    },
    {
      label: "Almacenes",
      icon: <WarehouseIcon />,
      path: "/warehouses",
    },
    {
      label: "Proveedores",
      icon: <LocalShippingIcon />,
      path: "/suppliers",
    },
    {
      label: "Stock",
      icon: <PendingActionsIcon />,
      path: "/stock",
    },
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
