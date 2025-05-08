package com.back_constructora.service;

import org.springframework.stereotype.Service;

import com.back_constructora.model.Warehouse;
import com.back_constructora.repository.WarehouseRespository;
import com.back_constructora.util.Validations;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WarehouseService 
{
    private final WarehouseRespository warehouseRespository;

    public Warehouse save(Warehouse warehouse) 
    {
        if(warehouse == null) 
        {
            throw new IllegalArgumentException("Todos los campos son requeridos");
        }

        Validations.validateName(warehouse.getName());
        Validations.validateAddress(warehouse.getAddress());
        Validations.validateFk("Supervisor", warehouse.getFkSupervisor());

        if(warehouseRespository.existsByName(warehouse.getName())) 
        {
            throw new IllegalStateException("Ya existe un almacen con el mismo nombre");
        }

        if(warehouseRespository.existsByAddress(warehouse.getAddress())) 
        {
            throw new IllegalStateException("Ya existe un almacen en la misma dirección");
        }

        return warehouseRespository.save(warehouse);
    }
}
