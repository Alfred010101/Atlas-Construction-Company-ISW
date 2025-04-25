package com.back_constructora.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back_constructora.model.User;
import com.back_constructora.service.UserService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class RegisterController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> createUser(@Validated @RequestBody User user) 
    {
        User savedUser = userService.save(user);
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
