package com.back_constructora.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) 
public interface CustomerDTO 
{
    Integer getCustomerId();
    String getCustomerFirstName();
    String getCustomerLastName(); 
    String getCustomerFullName();
    String getCustomerAddress();
    String getCustomerPhone();
} 