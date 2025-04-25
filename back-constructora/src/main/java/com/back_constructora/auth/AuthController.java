package com.back_constructora.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController
{

    private final AuthService authService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request)
    {
        if (request.getUsername().trim().isEmpty() || request.getPassword().trim().isEmpty() ) 
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Faltan credenciales");
        }
        return authService.login(request);
    }
}