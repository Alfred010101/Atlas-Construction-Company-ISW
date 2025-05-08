package com.back_constructora.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) 
public interface ProjectDTO extends EmployeeDTO, CustomerDTO
{

    Integer getProjectId();
    String getProjectName();
    Integer getFkCustomer();
    //String getCustomerName();
    String getProjectAddress();
    LocalDate getProjectStartDate();
    LocalDate getProjectEndDate();
    Integer getFkSupervisor();
    //String getSupervisorName();  

} 