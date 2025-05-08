package com.back_constructora.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.back_constructora.dto.WarehouseDTO;
import com.back_constructora.model.Warehouse;

@Repository
public interface WarehouseRespository extends JpaRepository <Warehouse, Integer> 
{
    boolean existsByName(String name);  

    boolean existsByAddress(String address);  

    @Query(value = """
        SELECT 
            w.id AS warehouseId,
            w.name AS warehouseName,
            w.address As warehouseAddress,
            e.id AS warehouseFkSupervisor,
            CONCAT(e.first_name, ' ', e.last_name) AS employeeFullName
        FROM 
            warehouses w
        INNER JOIN 
            employees e ON w.fk_supervisor = e.id;
        """, nativeQuery = true)
    Optional<List<WarehouseDTO>> findAllAsList();
}
