package com.back_constructora.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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
    name = "warehouses",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"name", "address"}
        )
    }
)
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false, length = 63)
    private String name;

    @Column(name = "address", nullable = false,  length = 255)
    private String address;

    @Column(name = "fk_supervisor", nullable = false)
    private Integer fkSupervisor;
}