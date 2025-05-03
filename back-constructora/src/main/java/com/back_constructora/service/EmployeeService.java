package com.back_constructora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.back_constructora.dto.EmployeeDTO;
import com.back_constructora.model.Employee;
import com.back_constructora.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService 
{

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public Employee save(Employee employee) 
    {
        if(employee.getUsername() == null || employee.getUsername().isEmpty()) 
        {
            throw new IllegalArgumentException("El email es requerido");
        }

        if(employeeRepository.existsByUsername(employee.getUsername())) 
        {
            throw new IllegalStateException("El email no se encuentra disponible");
        }

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

    public void updateUser(String username, Employee request) 
    {
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            employeeRepository.updateUserWithPassword(
                    request.getFirstName(),
                    request.getLastName(),
                    request.getPhone(),
                    request.getRole(),
                    new BCryptPasswordEncoder().encode(request.getPassword()),
                    username
            );
        } else {
            employeeRepository.updateUserWithoutPassword(
                    request.getFirstName(),
                    request.getLastName(),
                    request.getPhone(),
                    request.getRole(),
                    username
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