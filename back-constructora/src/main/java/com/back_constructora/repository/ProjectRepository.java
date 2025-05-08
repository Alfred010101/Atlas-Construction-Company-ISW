package com.back_constructora.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
            e.id AS fksupervisor,
            CONCAT(e.first_name, ' ', e.last_name) AS employeeFullName
        FROM 
            projects p
        INNER JOIN 
            customers c ON p.fk_customer = c.id
        INNER JOIN 
            employees e ON p.fk_supervisor = e.id;
        """, nativeQuery = true)
    Optional<List<ProjectDTO>> findAllAsList();
    
}
