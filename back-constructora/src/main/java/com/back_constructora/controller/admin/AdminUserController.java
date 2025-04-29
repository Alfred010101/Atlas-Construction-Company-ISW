package com.back_constructora.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back_constructora.service.UserService;
import com.back_constructora.util.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin/employees")
@RequiredArgsConstructor
public class AdminUserController 
{
    private final UserService userService;

    @GetMapping("/getSupervisor")
    public ResponseEntity<ApiResponse<?>> getAllCustomers() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>("Todos los supervisores de obra", userService.getSuperviFullNameDto()));
    }
}
