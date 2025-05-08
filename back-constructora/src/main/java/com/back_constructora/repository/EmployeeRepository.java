package com.back_constructora.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.back_constructora.dto.EmployeeDTO;
import com.back_constructora.model.Role;
import com.back_constructora.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> 
{
    @Query(value = """
        SELECT * FROM employees
        WHERE username = :username
        """, nativeQuery = true)
    Optional<Employee> findByUsername(@Param("username") String username);
    //Optional<Employee> findByUsername(String username);
    boolean existsByUsername(String username);  

    @Query(value = """
        SELECT CONCAT(first_name, ' ', last_name) AS employeeFullName, username, phone AS employeePhone, role
        FROM employees;
        """, nativeQuery = true)
    Optional<List<EmployeeDTO>> findAllAsList();

    @Query(value = """
        SELECT first_name AS employeeFirstName, last_name AS employeeLastName, username, phone AS employeePhone, role
        FROM employees
        WHERE username = :username;
        """, nativeQuery = true)
    Optional<EmployeeDTO> findByUsernameAllProps(@Param("username") String username);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE employees 
        SET first_name = :firstName,
            last_name = :lastName,
            phone = :phone,
            role = :role,
            password = :password
        WHERE username = :username
        """, nativeQuery = true)
    int updateUserWithPassword(
        @Param("username") String username,
        @Param("firstName") String firstName,
        @Param("lastName") String lastName,
        @Param("phone") String phone,
        @Param("role") Role role,
        @Param("password") String password            
    );

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE employees 
        SET first_name = :firstName,
            last_name = :lastName,
            phone = :phone,
            role = :role
        WHERE username = :username
        """, nativeQuery = true)
    int updateUserWithoutPassword(
        @Param("username") String username,
        @Param("firstName") String firstName,
        @Param("lastName") String lastName,
        @Param("phone") String phone,
        @Param("role") Role role
    );

    @Transactional
    @Modifying
    @Query(value = """
        DELETE FROM employees 
        WHERE username = :username
        """, nativeQuery = true)
    void deleteByUsername(@Param("username") String username);

    @Query(value = """
        SELECT  id AS employeeId, CONCAT(first_name, ' ', last_name) AS employeeFullName
        FROM employees
        WHERE role = :role;
        """, nativeQuery = true)
    Optional<List<EmployeeDTO>> getListByRole(@Param("role") String role);
}