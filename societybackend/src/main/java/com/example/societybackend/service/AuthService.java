package com.example.societybackend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.societybackend.entity.Owner;
import com.example.societybackend.entity.Tenant;
import com.example.societybackend.repository.OwnerRepository;
import com.example.societybackend.repository.TenantRepository;

@Service
public class AuthService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private TenantRepository tenantRepository;

    

    public Owner findOwnerByEmail(String email) {
        return ownerRepository.findByEmail(email).orElse(null);
    }

    public Tenant findTenantByEmail(String email) {
        return tenantRepository.findByEmail(email).orElse(null);
    }

    // public Owner saveOwner(Owner owner) {
    //     owner.setPassword(passwordEncoder.encode(owner.getPassword()));
    //     return ownerRepository.save(owner);
    // }

    // public Tenant saveTenant(Tenant tenant) {
    //     tenant.setPassword(passwordEncoder.encode(tenant.getPassword()));
    //     return tenantRepository.save(tenant);
    // }
}
