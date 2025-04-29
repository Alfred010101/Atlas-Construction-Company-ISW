package com.back_constructora.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) 
public interface ProjectsDTO 
{

    Integer getId();
    String getName();
    Integer getCustomerId();
    String getCustomerName();
    String getAddress();
    LocalDate getStartDate();
    LocalDate getEndDate();
    Integer getSupervisorId();
    String getSupervisorName();  

} 