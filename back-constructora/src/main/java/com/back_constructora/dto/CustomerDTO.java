package com.back_constructora.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) 
public interface CustomerDTO 
{
    Integer getId();
    String getFirstName();
    String getLastName(); 
    String getAddress();
    String getPhone();
} 