import { Warehouse as WarehouseFull } from "../interfaces/models/Models";

interface HandleSaveWarehouseProps {
  handleClearFields: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
  warehouseData: WarehouseFull;
}

export const saveWarehouse = async ({
  refresh,
  handleClearFields,
  handleSnackBar,
  warehouseData,
}: HandleSaveWarehouseProps) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/warehouses/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(warehouseData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    handleSnackBar(data.message, "success");
    handleClearFields();
    refresh();
  } catch (error) {
    handleSnackBar(String(error), "error");
  }
};
