package com.example.societybackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.societybackend.entity.Owner;
import com.example.societybackend.entity.Tenant;
import com.example.societybackend.repository.OwnerRepository;

@Service
public class OwnerService {
     @Autowired
    private OwnerRepository ownerRepository;

    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }
    public Owner findOwnerByEmail(String email) {
        return ownerRepository.findByEmail(email).orElse(null);
    }
    
    public Owner saveOwner(Owner owner) {
        owner.setPassword((owner.getPassword()));
        return ownerRepository.save(owner);
    }
    public Owner findOwnerById(Long ownerid) {
        return ownerRepository.findById(ownerid).orElse(null);
    }
}
