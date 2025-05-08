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

interface HandleGetCustomersProps {
  setCustomers: (value: React.SetStateAction<Customer[]>) => void;
  handleSnackBar?: (text: string, type: "success" | "error") => void;
}

export const getCustomers = async ({
  setCustomers,
  handleSnackBar,
}: HandleGetCustomersProps) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      if (handleSnackBar) handleSnackBar("Token no disponible.", "error");
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
    if (handleSnackBar) handleSnackBar(data.message, "success");
  } catch (error) {
    if (handleSnackBar) handleSnackBar(String(error), "error");
  }
};

interface HandleGetCustomerProps {
  customerId: number;
  setCustomerData: (value: React.SetStateAction<Customer>) => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

export const getCustomer = async ({
  customerId,
  setCustomerData,
  handleSnackBar,
}: HandleGetCustomerProps) => {
  const token = localStorage.getItem("token");
  fetch(
    `http://localhost:8080/api/admin/v1/customers/find/${encodeURIComponent(
      customerId
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setCustomerData({
        customerId: data.data.id,
        customerFirstName: data.data.firstName,
        customerLastName: data.data.lastName,
        customerAddress: data.data.address,
        customerPhone: data.data.phone,
      });
    })
    .catch((err) => {
      handleSnackBar(String(err), "error");
    });
};

interface HandleUpdateCustomerProps {
  payload: Partial<CustomerFull>;
  handleSnackBar: (text: string, type: "success" | "error") => void;
  customerId: number;
  refresh: () => void;
}

export const updateCustomer = async ({
  payload,
  handleSnackBar,
  customerId,
  refresh,
}: HandleUpdateCustomerProps) => {
  const token = localStorage.getItem("token");
  console.log(payload);
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/v1/customers/update/${encodeURIComponent(
        customerId
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    handleSnackBar(data.message, "success");
    refresh();
  } catch (error) {
    handleSnackBar(String(error), "error");
  }
};
