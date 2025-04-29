package com.back_constructora.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back_constructora.model.Project;
import com.back_constructora.service.ProjectService;
import com.back_constructora.util.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin/projects")
@RequiredArgsConstructor
public class AdminProjectController 
{
    private final ProjectService projectService;

    @PostMapping("/registerProject")
    public ResponseEntity<ApiResponse<Project>> createEmployee(@Validated @RequestBody Project project) 
    {
        Project savedProject = projectService.save(project);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Proyecto creado satisfactoriamente", savedProject));
    }

    @GetMapping("/allProjects")
    public ResponseEntity<ApiResponse<?>> getAllCustomers() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>("Todos los clientes disponibles", projectService.findAllAsList()));
    }
}
