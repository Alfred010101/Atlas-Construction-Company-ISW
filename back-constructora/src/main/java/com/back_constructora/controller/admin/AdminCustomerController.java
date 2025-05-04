package com.back_constructora.controller.admin;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.back_constructora.dto.CustomerDTO;
import com.back_constructora.model.Customer;
import com.back_constructora.service.CustomerService;
import com.back_constructora.util.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/v1/customers")
@RequiredArgsConstructor
public class AdminCustomerController 
{

    private final CustomerService customerService;

    @Autowired 
    private ObjectMapper objectMapper;

    @PostMapping("/create")
    public ResponseEntity<ObjectNode> createEmployee(@Validated @RequestBody Customer customer) 
    {
        customerService.save(customer);
        ObjectNode json = objectMapper.createObjectNode();
        json.put("message", "Registro exitoso!");
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(json);
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> findAll() 
    {
        List<CustomerDTO> customers = customerService
            .findAllAsList()
            .orElse(Collections.emptyList());

        String message = (customers.isEmpty())  ?  
            "No se encontraron registros disponibles" : 
            "Clientes cargados exitosamente!";
        
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(Map.of(
                "message", message,
                "data", customers
            ));
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable("id") Integer id) 
    {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>(
                "Clinete encontrado", 
                customerService.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                )
            );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ObjectNode> update(
            @PathVariable("id") Integer id,
            @RequestBody Customer updateRequest) 
    {
        ObjectNode json = objectMapper.createObjectNode();
        try {
            if(customerService.update(id, updateRequest) > 0)  
            {      
                json.put("message", "Cliente actualizado correctamente.");
                return ResponseEntity.ok(json);
            }else
            {
                json.put("error", "Error al actualizar cliente.");
                return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(json);
            }
        } catch (Exception e) {
            json.put("error", "Error al actualizar cliente: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(json);
        }
    }

    @GetMapping("/getCustomers")
    public ResponseEntity<ApiResponse<?>> getAllCustomersFromNewProject() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>("Todos los supervisores de obra", customerService.getCustomerFullNameDto()));
    }
}
