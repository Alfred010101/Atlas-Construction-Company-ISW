package com.back_constructora.controller.admin;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.back_constructora.dto.ProjectDTO;
import com.back_constructora.model.Project;
import com.back_constructora.service.ProjectService;
import com.back_constructora.util.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/v1/projects")
@RequiredArgsConstructor
public class AdminProjectController 
{
    private final ProjectService projectService;

    @Autowired 
    private ObjectMapper objectMapper;

    @PostMapping("/create")
    public ResponseEntity<ObjectNode> save(@Validated @RequestBody Project project) 
    {
        projectService.save(project);

        ObjectNode json = objectMapper.createObjectNode();
        json.put("message", "Registro exitoso!");
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(json);
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> findAll() 
    {
        List<ProjectDTO> projects = projectService
            .findAllAsList()
            .orElse(Collections.emptyList());

        String message = (projects.isEmpty())  ?  
            "No se encontraron registros disponibles" : 
            "Empleados cargados exitosamente!";
        
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(Map.of(
                "message", message,
                "data", projects
            ));
    }

     @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) 
    {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ApiResponse<>(
                "Proyecto encontrado", 
                projectService.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                )
            );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ObjectNode> update(
            @PathVariable("id") Integer id,
            @RequestBody Project updateRequest) 
    {
        ObjectNode json = objectMapper.createObjectNode();
        try {
            if(projectService.updateProject(id, updateRequest)> 0)  
            {      
                json.put("message", "Proyecto actualizado correctamente.");
                return ResponseEntity.ok(json);
            }else
            {
                json.put("error", "Error al actualizar proyecto.");
                return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(json);
            }
        } catch (Exception e) {
            json.put("error", "Error al actualizar proyecto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(json);
        }
    }
}
