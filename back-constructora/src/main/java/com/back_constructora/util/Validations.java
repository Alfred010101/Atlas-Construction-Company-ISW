package com.back_constructora.util;
import java.util.regex.Pattern;

import com.back_constructora.model.Role;

public class Validations 
{
    // Validacion para nombres y apellidos
    public static void validateName(String name) 
    {
        String nameRegex = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s']+$";
        
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("$Nombre: es un campo requerido");
        }
        if (!Pattern.matches(nameRegex, name)) {
            throw new IllegalArgumentException("$Nombre: Solo se permiten letras y espacios");
        }
        if (name.trim().length() < 2) {
            throw new IllegalArgumentException("$Nombre: Debe tener al menos 2 caracteres");
        }
        if (name.trim().length() > 50) {
            throw new IllegalArgumentException("$Nombre: No puede exceder los 50 caracteres");
        }
    }

    // Validación para username
    public static void validateUsername(String username) {
        String usernameRegex = "^[a-zA-ZñÑ][a-zA-Z0-9ñÑ]*(?:[-_][a-zA-ZñÑ0-9]+)*$";
        
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("$Nombre de usuario: es un campo requerido");
        }
        System.out.println(username);
        if (!Pattern.matches(usernameRegex, username)) {
            throw new IllegalArgumentException(
                "$Nombre de usuario: Solo letras (a-z, A-Z), números y guiones (-_)\n" +
                "No puede empezar con números o guiones\n" +
                "No puede terminar con guiones");
        }
        if (username.length() < 4) {
            throw new IllegalArgumentException("$Nombre de usuario: Mínimo 4 caracteres");
        }
        if (username.length() > 30) {
            throw new IllegalArgumentException("$Nombre de usuario: Máximo 30 caracteres");
        }
    }

    // Validación para contraseña
    public static void validatePassword(String password) {
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("$Contraseña: es un campo requerid");
        }
        if (password.length() < 4) {
            throw new IllegalArgumentException("$Contraseña: Debe tener al menos 4 caracteres");
        }
        if (password.length() > 16) {
            throw new IllegalArgumentException("$Contraseña: No puede exceder los 16 caracteres");
        }
    }

    // Validación para teléfono en México
    public static void validatePhoneMX(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            throw new IllegalArgumentException("$Teléfono: Este campo es requerido");
        }
        if (phone.matches(".*\\D.*")) {
            throw new IllegalArgumentException("$Teléfono: Solo se permiten números (0-9)");
        }
        if (phone.startsWith("0") || phone.startsWith("1")) {
            throw new IllegalArgumentException("$Teléfono: La región no es válida");
        }
        if (phone.length() != 10) {
            throw new IllegalArgumentException("$Teléfono: Debe tener 10 dígitos exactos");
        }
    }

    // Validación para rol
    public static void validateRole(Role role) 
    {
        if (role == null) 
        {
            throw new IllegalArgumentException("$Rol: Este campo es requerido");
        }
    }
}
