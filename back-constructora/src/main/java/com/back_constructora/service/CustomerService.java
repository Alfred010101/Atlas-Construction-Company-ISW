package com.back_constructora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.back_constructora.dto.CustomerDTO;
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

    public List<Customer> findAllAsList()
    {
        return customerRepository.findAll();
    }

    public Optional<Customer> findById(Integer id)
    {
        return customerRepository.findById(id);
    }

    public void updateUser(Customer request)
    {
        customerRepository.updateCustomer(
            request.getId(),
            request.getFirstName(),
            request.getLastName(),
            request.getPhone(),
            request.getAddress()            
        );
    }

    public Optional<List<CustomerDTO>> getCustomerFullNameDto()
    {
        return customerRepository.getCustomerFullNameDto();
    }
}
