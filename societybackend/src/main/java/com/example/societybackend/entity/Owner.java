package com.example.societybackend.entity;


import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Owner")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Column(name = "flat_no")
    private String flatNo;

    private String phnNo;
    private String role;

    @OneToMany(mappedBy = "owner")
    private List<Tenant> tenantlist;
    

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
     public void setPassword(String password) {
         this.password = password;
     }
     public void setPhnNo(String phnNo) {
         this.phnNo = phnNo;
     }
     public void setTenantlist(List<Tenant> tenantlist) {
         this.tenantlist = tenantlist;
     }
     public String getEmail() {
         return email;
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
     public String getPassword() {
         return password;
     }
     public String getPhnNo() {
         return phnNo;
     }
     public List<Tenant> getTenantlist() {
         return tenantlist;
     }

}

