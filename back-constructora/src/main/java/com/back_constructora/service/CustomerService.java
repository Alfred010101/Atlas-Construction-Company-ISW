package com.back_constructora.service;

import org.springframework.stereotype.Service;

import com.back_constructora.model.Customer;
import com.back_constructora.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService 
{
    private final CustomerRepository customerRepository;

    public Customer save(Customer customer) 
    {
        return customerRepository.save(customer);
    }
}
