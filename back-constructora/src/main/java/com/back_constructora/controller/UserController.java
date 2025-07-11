package com.back_constructora.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back_constructora.model.Employee;
import com.back_constructora.service.EmployeeService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final EmployeeService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<Employee>> createUser(@Validated @RequestBody Employee user) 
    {
        Employee savedUser = userService.save(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Usuario creado satisfactoriamente", savedUser));
    }

    @GetMapping
    public String welcome()
    {
        return "Welcome Spring Security... as user";
    }

    @Getter
    @AllArgsConstructor
    private static class ApiResponse<T> 
    {
        private String message;
        private T data;
    }
}
