package com.back_constructora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.back_constructora.dto.AllUsersDTO;
import com.back_constructora.model.User;
import com.back_constructora.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService 
{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User save(User user) 
    {
        if(user.getUsername() == null || user.getUsername().isEmpty()) 
        {
            throw new IllegalArgumentException("El email es requerido");
        }

        if(userRepository.existsByUsername(user.getUsername())) 
        {
            throw new IllegalStateException("El email no se encuentra disponible");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }

    public Optional<AllUsersDTO> findByEmailAllProps(String email)
    {
        return userRepository.findEployeeByEmailAllProps(email);
    }

    public Optional<User> findByUserName(String email)
    {
        return userRepository.findByUsername(email);
    }

    public Optional<List<AllUsersDTO>> findAllAsList()
    {
        return userRepository.findAllAsList();
    }

    /*public ResponseEntity<?> update(User user, UserUpdateRequestDTO body)
    {
        //User user = userRepository.findByEmail(email).get();
        user.setFirstName(body.firstName());
        user.setLastName(body.lastName());
        user.setPhone(body.phone());
        return ResponseEntity.ok(userRepository.save(user));
    }*/

    public void updateUser(String email, User request) 
    {
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            userRepository.updateUserWithPassword(
                    request.getFirstName(),
                    request.getLastName(),
                    request.getPhone(),
                    request.getRole(),
                    new BCryptPasswordEncoder().encode(request.getPassword()),
                    email
            );
        } else {
            userRepository.updateUserWithoutPassword(
                    request.getFirstName(),
                    request.getLastName(),
                    request.getPhone(),
                    request.getRole(),
                    email
            );
        }
    }

    public void deleteUserByEmail(String email) {
        userRepository.deleteByEmail(email);
    }


}