package com.back_constructora.dto;

import com.back_constructora.model.Role;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) 
public interface UserDTO 
{
    Integer getId();
    String getFirstName();
    String getLastName(); 
    String getUsername();
    String getPassword();
    String getPhone();
    Role getRole();
}
