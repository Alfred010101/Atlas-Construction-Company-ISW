import { Warehouse as WarehouseFull } from "../interfaces/models/Models";
import { Warehouse } from "../interfaces/ModelsTypes";

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

interface HandleGetWarehouseProps {
  setWarehouse: (value: React.SetStateAction<Warehouse[]>) => void;
  handleSnackBar?: (text: string, type: "success" | "error") => void;
}

export const getWarehouse = async ({
  setWarehouse,
  handleSnackBar,
}: HandleGetWarehouseProps) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      if (handleSnackBar) handleSnackBar("Token no disponible.", "error");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/warehouses/all",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    const customerData = data.data.map((warehouse: Warehouse) => ({
      warehouseId: warehouse.warehouseId,
      warehouseName: warehouse.warehouseName,
      employeeFullName: warehouse.employeeFullName,
      warehouseAddress: warehouse.warehouseAddress,
      werahouseFkSupervisor: warehouse.warehouseFkSupervisor,
    }));
    setWarehouse(customerData);
    if (handleSnackBar) handleSnackBar(data.message, "success");
  } catch (error) {
    if (handleSnackBar) handleSnackBar(String(error), "error");
  }
};
