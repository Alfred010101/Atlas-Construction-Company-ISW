import { Employee } from "./../interfaces/ModelsTypes";
import { Employee as EmployeeFull } from "./../interfaces/models/Models";

interface HandleSaveEmployeeProps {
  handleClearFields: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
  employeeData: EmployeeFull;
}

export const saveEmployee = async ({
  refresh,
  handleClearFields,
  handleSnackBar,
  employeeData,
}: HandleSaveEmployeeProps) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/employees/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
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

interface HandleGetEmployeesProps {
  setEmployees: (value: React.SetStateAction<Employee[]>) => void;
  handleSnackBar?: (text: string, type: "success" | "error") => void;
}

export const getEmployees = async ({
  setEmployees,
  handleSnackBar,
}: HandleGetEmployeesProps) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      if (handleSnackBar) handleSnackBar("Token no disponible.", "error");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/employees/all",
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

    const employeesData = data.data.map((user: Employee) => ({
      employeeFullName: user.employeeFullName,
      username: user.username,
      employeePhone: user.employeePhone,
      role: user.role,
    }));

    setEmployees(employeesData);
    if (handleSnackBar) handleSnackBar(data.message, "success");
  } catch (error) {
    if (handleSnackBar) handleSnackBar(String(error), "error");
  }
};

interface HandleGetEmployeeProps {
  usernameToEdit: string;
  setEmployeeData: (value: React.SetStateAction<Employee>) => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

export const getEmployee = async ({
  usernameToEdit,
  setEmployeeData,
  handleSnackBar,
}: HandleGetEmployeeProps) => {
  const token = localStorage.getItem("token");
  fetch(
    `http://localhost:8080/api/admin/v1/employees/find/${encodeURIComponent(
      usernameToEdit
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
      setEmployeeData({
        employeeFirstName: data.data.employeeFirstName,
        employeeLastName: data.data.employeeLastName,
        username: data.data.username,
        employeePhone: data.data.employeePhone,
        role: data.data.role,
        password: "",
      });
    })
    .catch((err) => {
      handleSnackBar(String(err), "error");
    });
};

interface HandleUpdateEmployeeProps {
  payload: Partial<EmployeeFull>;
  handleSnackBar: (text: string, type: "success" | "error") => void;
  usernameToEdit: string | null;
  refresh: () => void;
}

export const updateEmployee = async ({
  payload,
  handleSnackBar,
  usernameToEdit,
  refresh,
}: HandleUpdateEmployeeProps) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/v1/employees/update/${encodeURIComponent(
        usernameToEdit || ""
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

interface HandleDeleteEmployeeProps {
  usernameToDelete: string | null;
  setOpenDeleteDialog: (value: React.SetStateAction<boolean>) => void;
  setSnackbarOpen: (value: React.SetStateAction<boolean>) => void;
  refreshFetchEmployees: (
    text: string,
    type: "success" | "error",
    refresh: boolean,
    visble: boolean
  ) => void;
}

export const deleteEmployee = async ({
  usernameToDelete,
  setOpenDeleteDialog,
  setSnackbarOpen,
  refreshFetchEmployees,
}: HandleDeleteEmployeeProps) => {
  try {
    if (!usernameToDelete) return;

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/v1/admin/deleteUser/${usernameToDelete}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el empleado.");
    }

    refreshFetchEmployees(
      "Empleado eliminado exitosamente!",
      "success",
      true,
      true
    );
  } catch (error) {
    refreshFetchEmployees(
      "Error al eliminar el empleado.",
      "error",
      true,
      true
    );
  }

  setOpenDeleteDialog(false);
  setSnackbarOpen(true);
};
