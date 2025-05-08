export interface Employee {
  employeeId?: number;
  employeeFirstName?: string;
  employeeLastName?: string;
  employeeFullName?: string;
  username?: string;
  password?: string;
  employeePhone?: string;
  role?: string;
}

export interface Customer {
  customerId?: number;
  customerFirstName?: string;
  customerLastName?: string;
  customerFullName?: string;
  customerAddress?: string;
  customerPhone?: string;
}

export interface Project extends Employee, Customer {
  projectId?: number;
  projectName?: string;
  projectFkCustomer?: number;
  projectAddress?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  projectFkSupervisor?: number;
}

export interface Warehouse extends Employee {
  warehouseId?: number;
  warehouseName?: string;
  warehouseAddress?: string;
  warehouseFkSupervisor?: number;
}
