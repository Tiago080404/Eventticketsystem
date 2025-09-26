package com.eventticketsystem.eventticketsystem.Controller;

import com.eventticketsystem.eventticketsystem.Entity.AuthRequest;
import com.eventticketsystem.eventticketsystem.Service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final JwtService jwtService;



    private final AuthenticationManager authenticationManager;
    public UserController(AuthenticationManager authenticationManager, JwtService jwtService){
        this.authenticationManager=authenticationManager;
        this.jwtService = jwtService;
    }


    @PostMapping("/login")//dann auch return type ändern
    public String loginHandler(@RequestBody AuthRequest authRequest){
        try{
            System.out.println("trying to login");
            Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(authRequest.getEmail(),authRequest.getPassword());
            Authentication authenticationresponse = authenticationManager.authenticate(authenticationRequest);

            //hier noch responseentity 200 wenn geht + jwt mitgeben
            if(authenticationresponse.isAuthenticated()){
                return jwtService.generateToken(authRequest.getEmail());
            }else {
                throw new UsernameNotFoundException("Invalid user request!"); //hier vllt eine responseentity auch
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
