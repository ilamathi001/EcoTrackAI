package com.ecotrack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecotrack.entity.User;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByMobileNumber(String mobileNumber);

    Optional<User> findByResetToken(String resetToken);
}