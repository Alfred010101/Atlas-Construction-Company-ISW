package com.back_constructora.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.back_constructora.dto.ProjectsDTO;
import com.back_constructora.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> 
{

    @Query(value = """
        SELECT 
            p.id,
            p.name AS name,
            p.address,
            p.start_date AS startDate,
            p.end_date AS endDate,
            c.id AS customerId,
            CONCAT(c.first_name, ' ', c.last_name) AS customerName,
            e.id AS supervisorId,
            CONCAT(e.first_name, ' ', e.last_name) AS supervisorName
        FROM 
            projects p
        INNER JOIN 
            customers c ON p.fk_customer = c.id
        INNER JOIN 
            users e ON p.fk_supervisor = e.id;
        """, nativeQuery = true)
    Optional<List<ProjectsDTO>> findAllAsList();
    
}
