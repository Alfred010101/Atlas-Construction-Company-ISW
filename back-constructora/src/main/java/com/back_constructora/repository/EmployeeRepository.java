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
        SELECT first_name AS firstName, last_name AS lastName, username, phone, role
        FROM employees
        WHERE username = :username;
        """, nativeQuery = true)
    Optional<EmployeeDTO> findEmployeeByUsernameAllProps(@Param("username") String username);

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
    void updateUserWithPassword(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("phone") String phone,
            @Param("role") Role role,
            @Param("password") String password,
            @Param("username") String username
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
    void updateUserWithoutPassword(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("phone") String phone,
            @Param("role") Role role,
            @Param("username") String username
    );

    @Transactional
    @Modifying
    @Query(value = """
        DELETE FROM employees 
        WHERE username = :username
        """, nativeQuery = true)
    void deleteByUsername(@Param("username") String username);

    @Query(value = """
        SELECT id, first_name AS firstName, last_name AS lastName
        FROM employees
        WHERE role = 'CONSTRUCTION_SUPERVISOR';
        """, nativeQuery = true)
    Optional<List<EmployeeDTO>> getSuperviFullNameDto();
}