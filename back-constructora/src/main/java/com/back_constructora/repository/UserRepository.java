package com.back_constructora.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.back_constructora.dto.AllUsersDTO;
import com.back_constructora.dto.UserDTO;
import com.back_constructora.model.Role;
import com.back_constructora.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> 
{
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);  
    
    @Query(value = """
        SELECT * FROM users
        WHERE email = :email
        """, nativeQuery = true)
    Optional<User> findByEmail(@Param("email") String email);

    @Query(value = """
        SELECT first_name AS firstName, last_name AS lastName, email AS username, phone, role
        FROM users;
        """, nativeQuery = true)
    Optional<List<AllUsersDTO>> findAllAsList();

    @Query(value = """
        SELECT first_name AS firstName, last_name AS lastName, email AS username, phone, role
        FROM users
        WHERE email = :email;
        """, nativeQuery = true)
    Optional<AllUsersDTO> findEployeeByEmailAllProps(@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE users 
            SET first_name = :firstName,
                last_name = :lastName,
                phone = :phone,
                role = :role,
                password = :password
            WHERE email = :email
            """, nativeQuery = true)
    void updateUserWithPassword(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("phone") String phone,
            @Param("role") Role role,
            @Param("password") String password,
            @Param("email") String email
    );

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE users 
            SET first_name = :firstName,
                last_name = :lastName,
                phone = :phone,
                role = :role
            WHERE email = :email
            """, nativeQuery = true)
    void updateUserWithoutPassword(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("phone") String phone,
            @Param("role") Role role,
            @Param("email") String email
    );

    @Transactional
    @Modifying
    @Query(value = """
        DELETE FROM users 
        WHERE email = :email
        """, nativeQuery = true)
    void deleteByEmail(@Param("email") String email);

    @Query(value = """
        SELECT id, first_name AS firstName, last_name AS lastName
        FROM users
        WHERE role = 'CONSTRUCTION_SUPERVISOR';
        """, nativeQuery = true)
    Optional<List<UserDTO>> getSuperviFullNameDto();
}