package com.back_constructora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.back_constructora.dto.CustomerDTO;
import com.back_constructora.model.Customer;
import com.back_constructora.repository.CustomerRepository;
import com.back_constructora.util.Validations;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService 
{
    private final CustomerRepository customerRepository;

    public Customer save(Customer customer) 
    {
        if(customer == null) 
        {
            throw new IllegalArgumentException("Todos los campos son requeridos");
        }

        Validations.validateName(customer.getFirstName());
        Validations.validateName(customer.getLastName());
        Validations.validateAddress(customer.getAddress());
        Validations.validatePhoneMX(customer.getPhone());        

        return customerRepository.save(customer);
    }

    public Optional<List<CustomerDTO>> findAllAsList()
    {
        return customerRepository.findAllAsList();
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
