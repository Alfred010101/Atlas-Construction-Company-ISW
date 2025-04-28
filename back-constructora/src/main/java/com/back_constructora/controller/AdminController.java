package com.back_constructora.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.back_constructora.dto.AllUsersDTO;
import com.back_constructora.model.User;
import com.back_constructora.service.UserService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @PostMapping("/registerUser")
    public ResponseEntity<ApiResponse<User>> createEmployee(@Validated @RequestBody User user) 
    {
        User savedUser = userService.save(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Usuario creado satisfactoriamente", savedUser));
    }

    @GetMapping("/allUsers")
    public ResponseEntity<ApiResponse<List<AllUsersDTO>>> findAll() 
    {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>("Todos los usuarios disponibles", userService.findAllAsList().orElse(Collections.emptyList())));
    }

    @GetMapping("/findUser/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable("email") String email) 
    {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>(
                "Empleado encotrado", 
                userService.findByEmailAllProps(email)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                )
            );
    }

    @PutMapping("/updateUser/{email}")
    public ResponseEntity<ApiResponse<String>> updateUserByEmail(
            @PathVariable("email") String email,
            @RequestBody User updateUserRequest) 
    {
        try {
            userService.updateUser(email, updateUserRequest);
            return ResponseEntity.ok(new ApiResponse<>("Usuario actualizado correctamente.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Error al actualizar usuario: " + e.getMessage(), null));
    }
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
