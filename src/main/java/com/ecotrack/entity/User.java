package com.ecotrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Please enter your Full Name")
    @Size(
        min = 3,
        max = 50,
        message = "Full Name must contain 3 to 50 characters"
    )
    private String name;

    @NotBlank(message = "Please enter your Email Address")
    @Email(message = "Please enter a valid Email Address")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Please enter your Mobile Number")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Mobile Number must be exactly 10 digits"
    )
    @Column(unique = true)
    private String mobileNumber;

    @NotBlank(message = "Please enter your Password")
    @Size(
        min = 8,
        message = "Password must be at least 8 characters long"
    )
    private String password;

    private String resetToken;

    private Long resetTokenExpiry;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public Long getResetTokenExpiry() {
        return resetTokenExpiry;
    }

    public void setResetTokenExpiry(Long resetTokenExpiry) {
        this.resetTokenExpiry = resetTokenExpiry;
    }
}