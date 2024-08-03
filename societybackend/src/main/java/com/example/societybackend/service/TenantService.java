package com.example.societybackend.service;

import com.example.societybackend.entity.Tenant;
import com.example.societybackend.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenantService {

    @Autowired
    private TenantRepository tenantRepository;

    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    public Tenant findTenantByEmail(String email) {
        return tenantRepository.findByEmail(email).orElse(null);
    }

    public Tenant saveTenant(Tenant tenant) {
        tenant.setPassword((tenant.getPassword()));
        return tenantRepository.save(tenant);
    }

    public void deleteTenant(Tenant existingTenant) {
        tenantRepository.delete(existingTenant);
    }
}
