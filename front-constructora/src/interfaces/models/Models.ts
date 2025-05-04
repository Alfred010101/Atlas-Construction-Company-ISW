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
