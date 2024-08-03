package com.example.societybackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.societybackend.entity.Tenant;

public interface TenantRepository extends JpaRepository<Tenant,Long> {
    Optional<Tenant> findByEmail(String email);
} 
