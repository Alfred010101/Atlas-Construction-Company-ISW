package com.back_constructora.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.back_constructora.dto.CustomerDTO;
import com.back_constructora.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> 
{
    @Modifying
    @Transactional
    @Query(value = """
            UPDATE customers 
            SET first_name = :firstName,
                last_name = :lastName,
                phone = :phone,
                address = :address
            WHERE id = :id
            """, nativeQuery = true)
    void updateCustomer(
        @Param("id") Integer id,
        @Param("firstName") String firstName,
        @Param("lastName") String lastName,
        @Param("phone") String phone,
        @Param("address") String address            
    );

    @Query(value = """
        SELECT id, first_name AS firstName, last_name AS lastName
        FROM customers;
        """, nativeQuery = true)
    Optional<List<CustomerDTO>> getCustomerFullNameDto();
}
