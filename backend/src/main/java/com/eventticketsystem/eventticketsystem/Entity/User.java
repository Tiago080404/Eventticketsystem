package com.eventticketsystem.eventticketsystem.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;


    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getPassword(){
        return  password;
    }
    public void setPassword(){
        this.password = password;
    }
    public Role getRole(){return role;}
    public void setRole(Role role) {
        this.role = role;
    }
}
