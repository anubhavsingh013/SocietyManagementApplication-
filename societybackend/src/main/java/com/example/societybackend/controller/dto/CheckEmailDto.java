package com.example.societybackend.controller.dto;

public class CheckEmailDto {
    private String email;
    private String password;
    private String name;
    private String flatNo;
    private String role;
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getFlatNo() {
        return flatNo;
    }
    public String getName() {
        return name;
    }
    public String getRole() {
        return role;
    }
}
