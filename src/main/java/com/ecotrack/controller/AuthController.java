package com.ecotrack.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ecotrack.entity.User;
import com.ecotrack.exception.ResourceNotFoundException;
import com.ecotrack.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {


@Autowired
private UserRepository userRepository;

@Autowired
private BCryptPasswordEncoder passwordEncoder;

@PostMapping("/register")
public User register(
        @Valid @RequestBody User user) {

    user.setPassword(
            passwordEncoder.encode(
                    user.getPassword()));

    return userRepository.save(user);
}

@PostMapping("/login")
public Map<String, Object> login(
        @RequestBody Map<String, String> request) {

    String loginId =
            request.get("loginId");

    String password =
            request.get("password");

    Optional<User> user =
            userRepository.findByEmail(loginId);

    if (user.isEmpty()) {

        user =
                userRepository.findByMobileNumber(
                        loginId);
    }

    if (user.isEmpty()) {

        throw new ResourceNotFoundException(
                "Invalid Credentials");
    }

    if (!passwordEncoder.matches(
            password,
            user.get().getPassword())) {

        throw new ResourceNotFoundException(
                "Invalid Credentials");
    }

    Map<String, Object> response =
            new HashMap<>();

    response.put(
            "success",
            true);

    response.put(
            "user",
            user.get());

    return response;
}

@PostMapping("/change-password")
public Map<String, String> changePassword(
        @RequestBody Map<String, String> request) {

    String email =
            request.get("email");

    String newPassword =
            request.get("newPassword");

    Optional<User> user =
            userRepository.findByEmail(email);

    if (user.isEmpty()) {

        throw new ResourceNotFoundException(
                "Email Not Found");
    }

    User existingUser =
            user.get();

    existingUser.setPassword(
            passwordEncoder.encode(
                    newPassword));

    userRepository.save(
            existingUser);

    Map<String, String> response =
            new HashMap<>();

    response.put(
            "message",
            "Password Updated Successfully");

    return response;
}


}
