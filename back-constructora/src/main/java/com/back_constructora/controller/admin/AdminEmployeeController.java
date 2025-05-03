package com.back_constructora.controller.admin;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.back_constructora.dto.EmployeeDTO;
import com.back_constructora.model.Employee;
import com.back_constructora.service.EmployeeService;
import com.back_constructora.util.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/v1/employees")
@RequiredArgsConstructor
public class AdminEmployeeController 
{
    private final EmployeeService employeeService;
    @Autowired 
    private ObjectMapper objectMapper;

    @PostMapping("/create")
    public ResponseEntity<ObjectNode> save(@Validated @RequestBody Employee employee) 
    {
        employeeService.save(employee);

        ObjectNode json = objectMapper.createObjectNode();
        json.put("message", "Registro exitoso!");
        
        return ResponseEntity.status(HttpStatus.CREATED).body(json);
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> findAll() 
    {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>("Todos los usuarios disponibles", employeeService.findAllAsList().orElse(Collections.emptyList())));
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<?> findByUsername(@PathVariable("username") String username) 
    {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>(
                "Empleado encotrado", 
                employeeService.findByUsernameAllProps(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                )
            );
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<ApiResponse<String>> update(
            @PathVariable("username") String username,
            @RequestBody Employee updateRequest) 
    {
        try {
            employeeService.updateUser(username, updateRequest);
            return ResponseEntity.ok(new ApiResponse<>("Empleado actualizado correctamente.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Error al actualizar empleado: " + e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> delete( @PathVariable("username") String username)
    {
        employeeService.deleteByUsername(username);
        return ResponseEntity.ok("Usuario eliminado exitosamente.");
    }

    @GetMapping("/findAllSupervisors")
    public ResponseEntity<ApiResponse<?>> findAllSupervisors() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>("Todos los supervisores de obra", employeeService.getSuperviFullNameDto()));
    }

    @GetMapping
    public String welcome()
    {
        return "Welcome Spring Security... as user";
    }
}
