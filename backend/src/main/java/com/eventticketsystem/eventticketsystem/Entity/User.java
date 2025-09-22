package com.eventticketsystem.eventticketsystem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;


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
}
