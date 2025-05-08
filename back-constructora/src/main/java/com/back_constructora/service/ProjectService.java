package com.back_constructora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.back_constructora.dto.ProjectDTO;
import com.back_constructora.model.Project;
import com.back_constructora.repository.ProjectRepository;
import com.back_constructora.util.Validations;

//import com.back_constructora.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService 
{
    
    private final ProjectRepository projectRepository;
    
    public Project save(Project project) 
    {
        if(project == null) 
        {
            throw new IllegalArgumentException("Todos los campos son requeridos");
        }

        Validations.validateName(project.getName());
        Validations.validateAddress(project.getAddress());
        Validations.validateFk("Cliente", project.getFkCustomer());
        Validations.validateFk("Supervisor", project.getFkSupervisor());
        Validations.validateStartDate(project.getStartDate());
        Validations.validateEndDate(project.getStartDate(), project.getEndDate());

        if(projectRepository.existsByName(project.getName())) 
        {
            throw new IllegalStateException("El nombre de proyecto no se encuentra disponible");
        }

        return projectRepository.save(project);
    }

    public Optional<List<ProjectDTO>> findAllAsList() 
    {
        return projectRepository.findAllAsList() ;
    }

}
