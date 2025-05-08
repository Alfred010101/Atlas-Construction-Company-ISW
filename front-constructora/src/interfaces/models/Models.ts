export interface Employee {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  role: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

export interface Project {
  name: string;
  fkCustomer: number;
  address: string;
  startDate: string;
  endDate: string;
  fkSupervisor: number;
}

export interface Warehouse {
  name: string;
  address: string;
  fkSupervisor: number;
}

export interface Supplier {
  name: string;
  address: string;
  phone: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}
