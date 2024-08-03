package com.example.societybackend.controller.dto;

public class addtenantDto {
    private String name;
    private String email;
    private String password;
    private String flatNo;
    private String role;
    private Long ownerid;
    public String getEmail() {
        return email;
    }
    public String getName() {
        return name;
    }
    public String getPassword() {
        return password;
    }
    public String getFlatNo() {
        return flatNo;
    }
    public String getRole() {
        return role;
    }
    public Long getOwnerid() {
        return ownerid;
    }
}
