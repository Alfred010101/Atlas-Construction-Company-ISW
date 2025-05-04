import { Customer } from "../interfaces/ModelsTypes";
import { Customer as CustomerFull } from "./../interfaces/models/Models";

interface HandleSaveEmployeeProps {
  handleClearFields: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
  customerData: CustomerFull;
}

export const saveCustomer = async ({
  refresh,
  handleClearFields,
  handleSnackBar,
  customerData,
}: HandleSaveEmployeeProps) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/customers/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customerData),
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

interface HandleRefreshCustomerProps {
  setCustomers: (value: React.SetStateAction<Customer[]>) => void;
}

export const refreshCustomers = async ({
  setCustomers,
}: HandleRefreshCustomerProps) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/customers/all",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los empleados.");
    }

    const data = await response.json();

    const customerData = data.data.map((customer: Customer) => ({
      customerId: customer.customerId,
      customerFullName: customer.customerFullName,
      customerAddress: customer.customerAddress,
      customerPhone: customer.customerPhone,
    }));

    setCustomers(customerData);
  } catch (error) {
    console.error(String(error));
  }
};

interface HandleGetCustomersProps {
  setCustomers: (value: React.SetStateAction<Customer[]>) => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

export const getCustomers = async ({
  setCustomers,
  handleSnackBar,
}: HandleGetCustomersProps) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      handleSnackBar("Token no disponible.", "error");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/customers/all",
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

    const customerData = data.data.map((customer: Customer) => ({
      customerId: customer.customerId,
      customerFullName: customer.customerFullName,
      customerAddress: customer.customerAddress,
      customerPhone: customer.customerPhone,
    }));
    setCustomers(customerData);
    handleSnackBar(data.message, "success");
  } catch (error) {
    handleSnackBar(String(error), "error");
  }
};
