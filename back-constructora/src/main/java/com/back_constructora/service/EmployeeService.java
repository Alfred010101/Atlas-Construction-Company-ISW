package com.back_constructora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.back_constructora.dto.EmployeeDTO;
import com.back_constructora.model.Employee;
import com.back_constructora.repository.EmployeeRepository;
import com.back_constructora.util.Validations;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService 
{

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public Employee save(Employee employee) 
    {
        if(employee == null) 
        {
            throw new IllegalArgumentException("Todos los campos son requeridos");
        }

        Validations.validateName(employee.getFirstName());
        Validations.validateName(employee.getLastName());
        Validations.validateUsername(employee.getUsername());
        Validations.validatePassword(employee.getPassword());
        Validations.validatePhoneMX(employee.getPhone());
        Validations.validateRole(employee.getRole());

        if(employeeRepository.existsByUsername(employee.getUsername())) 
        {
            throw new IllegalStateException("El nombre de usuario no se encuentra disponible");
        }

        employee.setUsername(employee.getUsername().concat("@atlas.com"));
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }

    public Optional<Employee> findByEmail(String username)
    {
        return employeeRepository.findByUsername(username);
    }

    public Optional<EmployeeDTO> findByUsernameAllProps(String username)
    {
        return employeeRepository.findByUsernameAllProps(username);
    }

    public Optional<Employee> findByUserName(String username)
    {
        return employeeRepository.findByUsername(username);
    }

    public Optional<List<EmployeeDTO>> findAllAsList()
    {
        return employeeRepository.findAllAsList();
    }

    public int updateUser(String username, Employee request) 
    {
        if(request == null) 
        {
            throw new IllegalArgumentException("Todos los campos son requeridos");
        }

        Validations.validateName(request.getFirstName());
        Validations.validateName(request.getLastName());
        Validations.validatePhoneMX(request.getPhone());
        Validations.validateRole(request.getRole());

        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) 
        {
            Validations.validatePassword(request.getPassword());
            return employeeRepository.updateUserWithPassword(
                username,
                request.getFirstName(),
                request.getLastName(),
                request.getPhone(),
                request.getRole(),
                new BCryptPasswordEncoder().encode(request.getPassword())                    
            );
        } else 
        {
            return employeeRepository.updateUserWithoutPassword(
                username,
                request.getFirstName(),
                request.getLastName(),
                request.getPhone(),
                request.getRole()
                    
            );
        }
    }

    public void deleteByUsername(String username) {
        employeeRepository.deleteByUsername(username);
    }

    public Optional<List<EmployeeDTO>> getSuperviFullNameDto()
    {
        return employeeRepository.getSuperviFullNameDto();
    }
}