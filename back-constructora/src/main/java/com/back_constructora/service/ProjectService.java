package com.back_constructora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.back_constructora.dto.ProjectsDTO;
import com.back_constructora.model.Project;
import com.back_constructora.repository.ProjectRepository;

//import com.back_constructora.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService 
{
    
    private final ProjectRepository projectRepository;
    
    public Project save(Project project) 
    {
        return projectRepository.save(project);
    }

    public Optional<List<ProjectsDTO>> findAllAsList() 
    {
        return projectRepository.findAllAsList() ;
    }

}
