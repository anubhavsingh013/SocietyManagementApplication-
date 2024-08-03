package com.example.societybackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;
    private String role;

    @Column(name = "flat_no")
    private String flatNo;

    @ManyToOne
    @JsonBackReference
    private Owner owner;

    public void setRole(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setFlatNo(String flatNo) {
        this.flatNo = flatNo;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setOwner(Owner owner) {
        this.owner = owner;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getFlatNo() {
        return flatNo;
    }
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public Owner getOwner() {
        return owner;
    }
    public String getPassword() {
        return password;
    }
    public String getEmail() {
        return email;
    }
}