package com.back_constructora.dto;

import com.back_constructora.model.Role;

public interface AllUsersDTO {
    String getFirstName();
    String getLastName(); 
    String getUsername();
    String getPassword();
    String getPhone();
    Role getRole();
}