package com.anirudh.user_management_system.controller;
import com.anirudh.user_management_system.dto.LoginRequest;
import com.anirudh.user_management_system.dto.SignupRequest;
import com.anirudh.user_management_system.dto.UserResponse;
import com.anirudh.user_management_system.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public UserResponse signup(@RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/profiles")
    public List<UserResponse> getAllProfiles(@RequestHeader("X-Session-Token") String sessionToken) {
        return authService.getAllProfiles(sessionToken);
    }

    @PutMapping("/profile/{email}")
    public UserResponse updateProfile(
            @PathVariable String email,
            @RequestBody Map<String, String> request,
            @RequestHeader("X-Session-Token") String sessionToken) {
        String username = request.get("username");
        String bio = request.get("bio");
        return authService.updateProfile(email, username, bio, sessionToken);
    }
}