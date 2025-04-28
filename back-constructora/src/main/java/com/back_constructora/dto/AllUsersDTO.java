package com.back_constructora.dto;

import com.back_constructora.model.Role;

public interface AllUsersDTO {
    String getFirstName();
    String getLastName(); 
    String getUsername();
    String getPhone();
    Role getRole();
}