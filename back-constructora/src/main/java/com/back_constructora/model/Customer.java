package com.back_constructora.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
    name = "customers"
)
public class Customer 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", nullable = false, length = 51)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 51)
    private String lastName;

    @Column(name = "address", nullable = false,  length = 255)
    private String address;

    @Column(name = "phone", nullable = false, length = 10)
    private String phone;
}
