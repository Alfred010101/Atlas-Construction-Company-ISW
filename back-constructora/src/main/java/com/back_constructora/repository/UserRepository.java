package com.back_constructora.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.back_constructora.dto.AllUsersDTO;
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

}