package com.eventticketsystem.eventticketsystem.Service;

import com.eventticketsystem.eventticketsystem.Entity.User;
import com.eventticketsystem.eventticketsystem.Repository.UserRepository;
import com.eventticketsystem.eventticketsystem.dto.UserDataResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }

    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }


    public List<UserDataResponse> getUserData(String user){
    return userRepository.getUserData(user);
    }
}
