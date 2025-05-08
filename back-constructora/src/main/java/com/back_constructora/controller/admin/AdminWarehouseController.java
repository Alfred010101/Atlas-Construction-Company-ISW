package com.back_constructora.controller.admin;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back_constructora.dto.WarehouseDTO;
import com.back_constructora.model.Warehouse;
import com.back_constructora.service.WarehouseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/v1/warehouses")
@RequiredArgsConstructor
public class AdminWarehouseController 
{
    private final WarehouseService warehouseService;

    @Autowired 
    private ObjectMapper objectMapper;

    @PostMapping("/create")
    public ResponseEntity<ObjectNode> save(@Validated @RequestBody Warehouse warehouse) 
    {
        warehouseService.save(warehouse);

        ObjectNode json = objectMapper.createObjectNode();
        json.put("message", "Registro exitoso!");
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(json);
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> findAll() 
    {
        List<WarehouseDTO> warehouse = warehouseService
            .findAllAsList()
            .orElse(Collections.emptyList());

        String message = (warehouse.isEmpty())  ?  
            "No se encontraron registros disponibles" : 
            "Almacenes cargados exitosamente!";
        
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(Map.of(
                "message", message,
                "data", warehouse
            ));
    }
}
