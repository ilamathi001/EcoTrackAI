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
    public Map<String, Object> register(@Valid @RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email Address already exists");
        }

        if (userRepository.findByMobileNumber(user.getMobileNumber()).isPresent()) {
            throw new RuntimeException("Mobile Number already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", savedUser.getId());
        userData.put("name", savedUser.getName());
        userData.put("email", savedUser.getEmail());
        userData.put("mobileNumber", savedUser.getMobileNumber());

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Registration Successful");
        response.put("user", userData);

        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {

        String loginId = request.get("loginId");
        String password = request.get("password");

        if (loginId == null || loginId.trim().isEmpty()) {
            throw new RuntimeException("Email or Mobile Number is required");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        Optional<User> user = userRepository.findByEmail(loginId);

        if (user.isEmpty()) {
            user = userRepository.findByMobileNumber(loginId);
        }

        if (user.isEmpty()) {
            throw new ResourceNotFoundException("Invalid Credentials");
        }

        User existingUser = user.get();

        if (!passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new ResourceNotFoundException("Invalid Credentials");
        }

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", existingUser.getId());
        userData.put("name", existingUser.getName());
        userData.put("email", existingUser.getEmail());
        userData.put("mobileNumber", existingUser.getMobileNumber());

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login Successful");
        response.put("user", userData);

        return response;
    }

    @PostMapping("/change-password")
    public Map<String, String> changePassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String newPassword = request.get("newPassword");

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (newPassword == null || newPassword.trim().isEmpty()) {
            throw new RuntimeException("New Password is required");
        }

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new ResourceNotFoundException("Email Not Found");
        }

        User existingUser = user.get();
        existingUser.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(existingUser);

        Map<String, String> response = new HashMap<>();
        response.put("success", "true");
        response.put("message", "Password Updated Successfully");

        return response;
    }
}