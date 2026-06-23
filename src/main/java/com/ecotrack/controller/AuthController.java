package com.ecotrack.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecotrack.entity.User;
import com.ecotrack.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {


@Autowired
private UserRepository userRepository;

@PostMapping("/register")
public User register(
        @RequestBody User user) {

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
            userRepository.findByEmail(
                    loginId);

    if (user.isEmpty()) {

        user =
                userRepository
                        .findByMobileNumber(
                                loginId);
    }

    Map<String, Object> response =
            new HashMap<>();

    if (user.isPresent()
            && user.get()
            .getPassword()
            .equals(password)) {

        response.put(
                "success",
                true);

        response.put(
                "user",
                user.get());

    } else {

        response.put(
                "success",
                false);

        response.put(
                "message",
                "Invalid Credentials");
    }

    return response;
}


}
