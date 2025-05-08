package com.back_constructora.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) 
public interface WarehouseDTO extends EmployeeDTO
{
    Integer getWarehouseId();
    String getWarehouseName();
    String getWarehouseAddress();
    Integer getWarehouseFkSupervisor();
} 
