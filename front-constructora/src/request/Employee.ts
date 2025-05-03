import { Employee } from "./../interfaces/ModelsTypes";
import { Employee as EmployeeFull } from "./../interfaces/models/Models";

interface HandleSaveEmployeeProps {
  handleClearFields: () => void;
  handleSubmit: (
    text: string,
    type: "success" | "error",
    refresh: boolean,
    visble: boolean
  ) => void;
  employeeData: EmployeeFull;
}

export const saveEmployee = async ({
  handleSubmit,
  handleClearFields,
  employeeData,
}: HandleSaveEmployeeProps) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token no disponible");
      return;
    }

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

    if (!response.ok) {
      throw new Error("Error al registrar el empleado.");
    }
    handleSubmit("Empleado registrado exitosamente!", "success", true, true);
    handleClearFields();
  } catch (error) {
    handleSubmit(
      "Error registrando empleado: ".concat(String(error)),
      "error",
      true,
      true
    );
  }
};

interface HandleGetEmployeesProps {
  setEmployees: (value: React.SetStateAction<Employee[]>) => void;
  setSnackbarOpen: (value: React.SetStateAction<boolean>) => void;
}

export const getEmployees = async ({
  setEmployees,
  setSnackbarOpen,
}: HandleGetEmployeesProps) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token no disponible.");
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

    if (!response.ok) {
      throw new Error("Error al obtener los empleados.");
    }

    const data = await response.json();

    const employeesData = data.data.map((user: Employee) => ({
      employeeFullName: user.employeeFullName,
      username: user.username,
      employeePhone: user.employeePhone,
      role: user.role,
    }));

    setEmployees(employeesData);
    setSnackbarOpen(true);
  } catch (error) {
    console.error("Error fetching employees:", error);
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

export const handleDeleteEmployee = async ({
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
