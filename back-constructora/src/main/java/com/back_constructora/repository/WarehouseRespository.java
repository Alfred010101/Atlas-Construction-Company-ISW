package com.back_constructora.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.back_constructora.model.Warehouse;

@Repository
public interface WarehouseRespository extends JpaRepository <Warehouse, Integer> 
{
    boolean existsByName(String name);  

    boolean existsByAddress(String address);  
}
