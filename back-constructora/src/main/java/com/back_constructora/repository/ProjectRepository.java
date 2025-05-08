package com.back_constructora.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.back_constructora.dto.ProjectDTO;
import com.back_constructora.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> 
{

    @Query(value = """
        SELECT 
            p.id AS projectId,
            p.name AS projectName,
            p.address As projectAddress,
            p.start_date AS projectStartDate,
            p.end_date AS projectEndDate,
            c.id AS fkCustomer,
            CONCAT(c.first_name, ' ', c.last_name) AS customerFullName,
            e.id AS fkSupervisor,
            CONCAT(e.first_name, ' ', e.last_name) AS employeeFullName
        FROM 
            projects p
        INNER JOIN 
            customers c ON p.fk_customer = c.id
        INNER JOIN 
            employees e ON p.fk_supervisor = e.id;
        """, nativeQuery = true)
    Optional<List<ProjectDTO>> findAllAsList();
    
    boolean existsByName(String username);  

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE projects 
            SET name = :name,
                fk_customer = :fkCustomer,
                address = :address,
                start_date = :startDate,
                end_date = :endDate,
                fk_supervisor = :fkSupervisor
            WHERE id = :id
            """, nativeQuery = true)
    int updateProject(
        @Param("id") Integer id,
        @Param("name") String name,
        @Param("fkCustomer") Integer fkCustomer,
        @Param("address") String address,
        @Param("startDate") LocalDate startDate, 
        @Param("endDate") LocalDate endDate, 
        @Param("fkSupervisor") Integer fkSupervisor            
    );
}
