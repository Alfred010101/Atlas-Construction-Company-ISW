import { Project } from "./../interfaces/ModelsTypes";
import { Project as ProjectFull } from "./../interfaces/models/Models";

interface HandleSaveProjectProps {
  handleClearFields: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
  projectData: ProjectFull;
}

export const saveProject = async ({
  refresh,
  handleClearFields,
  handleSnackBar,
  projectData,
}: HandleSaveProjectProps) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/projects/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
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

interface HandleGetProjectsProps {
  setProjects: (value: React.SetStateAction<Project[]>) => void;
  handleSnackBar?: (text: string, type: "success" | "error") => void;
}

export const getProjects = async ({
  setProjects,
  handleSnackBar,
}: HandleGetProjectsProps) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      if (handleSnackBar) handleSnackBar("Token no disponible.", "error");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/admin/v1/projects/all",
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

    const projectsData = data.data.map((project: Project) => ({
      projectId: project.projectId,
      projectName: project.projectName,
      projectFkCustomer: project.projectFkCustomer,
      customerFullName: project.customerFullName,
      projectAddress: project.projectAddress,
      projectStartDate: project.projectStartDate,
      projectEndDate: project.projectEndDate,
      projectFkSupervisor: project.projectFkSupervisor,
      employeeFullName: project.employeeFullName,
    }));

    setProjects(projectsData);
    if (handleSnackBar) handleSnackBar(data.message, "success");
  } catch (error) {
    if (handleSnackBar) handleSnackBar(String(error), "error");
  }
};

interface HandleGetProjectProps {
  projectId: number;
  setProjectData: (value: React.SetStateAction<ProjectFull>) => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

export const getProject = async ({
  projectId,
  setProjectData,
  handleSnackBar,
}: HandleGetProjectProps) => {
  const token = localStorage.getItem("token");
  fetch(
    `http://localhost:8080/api/admin/v1/projects/find/${encodeURIComponent(
      projectId
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
      setProjectData({
        name: data.data.name,
        fkCustomer: data.data.fkCustomer,
        address: data.data.address,
        startDate: data.data.startDate,
        endDate: data.data.endDate,
        fkSupervisor: data.data.fkSupervisor,
      });
    })
    .catch((err) => {
      handleSnackBar(String(err), "error");
    });
};

interface HandleUpdateProjectProps {
  projectData: ProjectFull;
  handleSnackBar: (text: string, type: "success" | "error") => void;
  projectId: number;
  refresh: () => void;
}

export const updateProject = async ({
  projectData,
  handleSnackBar,
  projectId,
  refresh,
}: HandleUpdateProjectProps) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/v1/projects/update/${encodeURIComponent(
        projectId || ""
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
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
