package com.eventticketsystem.eventticketsystem.Controller;

import com.eventticketsystem.eventticketsystem.Entity.AuthRequest;
import com.eventticketsystem.eventticketsystem.Entity.User;
import com.eventticketsystem.eventticketsystem.Service.JwtService;
import com.eventticketsystem.eventticketsystem.Service.UserService;
import com.eventticketsystem.eventticketsystem.dto.UserDataResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final JwtService jwtService;


    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public UserController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginHandler(@RequestBody AuthRequest authRequest) {
        try {
            System.out.println("trying to login");
            Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(authRequest.getEmail(), authRequest.getPassword());
            Authentication authenticationresponse = authenticationManager.authenticate(authenticationRequest);

            //hier noch responseentity 200 wenn geht + jwt mitgeben
            if (authenticationresponse.isAuthenticated()) {

                String token = jwtService.generateToken(authRequest.getEmail());

                User user = userService.getUserByEmail(authRequest.getEmail())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                Map<String, Object> userdata = new HashMap<>();
                userdata.put("username", user.getEmail());
                userdata.put("role", user.getRole());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", userdata);

                ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                        .httpOnly(true)
                        .secure(false)
                        .path("/")
                        .sameSite("Strict")
                        .maxAge(Duration.ofHours(2))
                        .build();


                return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(response);

            } else {
                throw new UsernameNotFoundException("Invalid user request!"); //hier vllt eine responseentity auch
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutHandler() {
        System.out.println("logging out...");
        ResponseCookie logoutCookie = ResponseCookie.from("jwt","").httpOnly(true).secure(false).path("/").sameSite("Strict").maxAge(0).build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, logoutCookie.toString())
                .body("logged out");
    }

    @GetMapping("/check")
    public ResponseEntity<?> getCurrentUser(@CookieValue(name = "jwt", required = false) String token) {
        if (token == null || !jwtService.isValid(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Not logged in"));
        }

        String email = jwtService.extractUsername(token);
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return ResponseEntity.ok(Map.of(
                "email", user.getEmail(),
                "role", user.getRole()
        ));
    }

    @GetMapping("/userdata/{user}")
    public ResponseEntity<?> getDataOfUser(@PathVariable String user){
        List<UserDataResponse> userDataResponse= userService.getUserData(user);
        return ResponseEntity.ok().body(userDataResponse);
    }
}
