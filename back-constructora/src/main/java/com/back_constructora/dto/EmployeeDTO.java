package com.back_constructora.dto;

import com.back_constructora.model.Role;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) 
public interface EmployeeDTO 
{
    Integer getEmployeeId();
    String getEmployeeFirstName();
    String getEmployeeLastName(); 
    String getEmployeeFullName();
    String getUsername();
    String getPassword();
    String getEmployeePhone();
    Role getRole();
}
