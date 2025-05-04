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

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable("id") Integer id) 
    {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ApiResponse<>(
                "Customer encontado", 
                customerService
                    .findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                )
            );
    }

    @PutMapping("/updateCustomer")
    public ResponseEntity<ApiResponse<String>> updateCustomer(
       // @PathVariable("id") String id,
        @RequestBody Customer updateCustomer) 
    {
        try {
            customerService.updateUser(updateCustomer);
            return ResponseEntity.ok(new ApiResponse<>("Cliente actualizado correctamente.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Error al actualizar cliente: " + e.getMessage(), null));
        }
    }

    @GetMapping("/getCustomers")
    public ResponseEntity<ApiResponse<?>> getAllCustomersFromNewProject() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>("Todos los supervisores de obra", customerService.getCustomerFullNameDto()));
    }
}
