package com.example.societybackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.societybackend.entity.Owner;
import com.example.societybackend.service.OwnerService;

@RestController
@RequestMapping("/api/owner")
public class check {
    @Autowired
    private OwnerService ownerService;
    @GetMapping
    public List<Owner> getAllOwners() {
        return ownerService.getAllOwners();
    }
}
