package com.example.societybackend.controller;

import com.example.societybackend.controller.dto.CheckEmailDto;
import com.example.societybackend.controller.dto.addtenantDto;
import com.example.societybackend.entity.Owner;
import com.example.societybackend.entity.Tenant;
import com.example.societybackend.service.OwnerService;
import com.example.societybackend.service.TenantService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    private TenantService tenantService;
    @Autowired
    private OwnerService ownerService;

    @GetMapping("/tenants")
    public List<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }

    @PostMapping("/findtenant")
    public Tenant findTenant(@RequestBody CheckEmailDto body) {
        Tenant existingTenant = tenantService.findTenantByEmail(body.getEmail());
        return existingTenant;
    }

    @PostMapping("/findowner")
    public Owner findOwner(@RequestBody CheckEmailDto body) {
        Owner existingowner=ownerService.findOwnerByEmail(body.getEmail());
        return existingowner; 
    }

    @PostMapping("/check-email")
    public String checkEmail(@RequestBody CheckEmailDto body) {
        Tenant existingTenant = tenantService.findTenantByEmail(body.getEmail());
        Owner existingowner=ownerService.findOwnerByEmail(body.getEmail());
        if((existingTenant!=null && existingTenant.getPassword()==null)||
            (existingowner!=null &&  existingowner.getPassword()==null)) {
            return "Email exists. You can set your password.";
        }
        if(existingTenant!=null && existingTenant.getPassword().length()>0){
            return "email and password exist";
        }
        else if(existingowner!=null && existingowner.getPassword().length()>0){
            return "email and password exist";
        }
        else if(existingTenant!=null || existingowner!=null) {
            return "Email exists. You can set your password.";
        }
        else return "Email not found.";
    }

    @PostMapping("/complete-signup")
    public String completeSignUp(@RequestBody CheckEmailDto body) {
        Tenant existingTenant = tenantService.findTenantByEmail(body.getEmail());
        Owner existingowner=ownerService.findOwnerByEmail(body.getEmail());
        if (existingTenant != null) {
            existingTenant.setPassword(body.getPassword()); 
            tenantService.saveTenant(existingTenant);
            return "SignUp completed. You can now log in.";
        }
        else if(existingowner!=null){
            existingowner.setPassword(body.getPassword());
            ownerService.saveOwner(existingowner);
            return "SignUp completed. You can now log in.";
        }
         else {
            return "User not found. Please contact the owner.";
        }
    }

    @PostMapping("/login")
    public String CompleteLogin(@RequestBody CheckEmailDto body) {
        Tenant existingTenant = tenantService.findTenantByEmail(body.getEmail());
        Owner existingowner=ownerService.findOwnerByEmail(body.getEmail());
        
        if (existingTenant != null) {
            return existingTenant.getRole()+"+"+existingTenant.getPassword();
        }
        else if(existingowner!=null){
            return existingowner.getRole()+"+"+existingowner.getPassword();
        }
         else {
            return "User not found. Please contact the owner.";
        }
    }


    @PostMapping("/addtenant")
    public String addTenant(@RequestBody addtenantDto body) {
        Tenant existingTenant=new Tenant();
        existingTenant.setName(body.getName());
        existingTenant.setEmail(body.getEmail());
        existingTenant.setPassword(body.getPassword());
        existingTenant.setFlatNo(body.getFlatNo());
        existingTenant.setRole(body.getRole());

        Owner owner=ownerService.findOwnerById(body.getOwnerid());
        existingTenant.setOwner(owner);
        tenantService.saveTenant(existingTenant);  
        return "tenant added successfully";
    }

    @PostMapping("/deletetenant")
    public String deleteTenant(@RequestBody addtenantDto body) {
        Tenant existingTenant = tenantService.findTenantByEmail(body.getEmail());
        tenantService.deleteTenant(existingTenant); 
        return "tenant deleted successfully";
    }
}
