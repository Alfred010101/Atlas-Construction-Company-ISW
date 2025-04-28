import { MenuItemTypes } from "../../interfaces/MenuItemTypes";
import {
  Assessment as AssessmentIcon,
  PendingActions as PendingActionsIcon,
} from "@mui/icons-material";

export const useMenuConfig = () => {
  const getNavItems = (): MenuItemTypes[] => [
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
