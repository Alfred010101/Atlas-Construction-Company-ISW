package com.back_constructora.controller.admin;

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

import com.back_constructora.model.Customer;
import com.back_constructora.service.CustomerService;
import com.back_constructora.util.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin/customers")
@RequiredArgsConstructor
public class CustomerController 
{

    private final CustomerService customerService;

    @PostMapping("/registerCustomer")
    public ResponseEntity<ApiResponse<Customer>> createEmployee(@Validated @RequestBody Customer customer) 
    {
        Customer savedCustomer = customerService.save(customer);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Customer creado satisfactoriamente", savedCustomer));
    }

    @GetMapping("/allCustomers")
    public ResponseEntity<ApiResponse<List<Customer>>> getAllCustomers() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>("Todos los clientes disponibles", customerService.findAllAsList()));
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
}
