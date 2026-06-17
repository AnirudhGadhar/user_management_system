package com.anirudh.user_management_system.service;

import com.anirudh.user_management_system.dto.LoginRequest;
import com.anirudh.user_management_system.dto.SignupRequest;
import com.anirudh.user_management_system.dto.UserResponse;
import com.anirudh.user_management_system.entity.User;
import com.anirudh.user_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    private static final Map<String, String> sessions = new java.util.concurrent.ConcurrentHashMap<>();

    // Signup
    public UserResponse signup(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .bio("")
                .build();

        userRepository.save(user);
        String sessionToken = UUID.randomUUID().toString();
        sessions.put(sessionToken, user.getEmail());

        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getBio(), sessionToken);
    }

    // Login
    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        String sessionToken = UUID.randomUUID().toString();
        sessions.put(sessionToken, user.getEmail());

        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getBio(), sessionToken);
    }

    // Get all profiles
    public List<UserResponse> getAllProfiles(String sessionToken) {
        validateSession(sessionToken);

        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getBio(), null))
                .toList();
    }

    // Update profile
    public UserResponse updateProfile(String email, String username, String bio, String sessionToken) {
        validateSession(sessionToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (username != null && !username.isEmpty()) {
            user.setUsername(username);
        }
        if (bio != null) {
            user.setBio(bio);
        }

        userRepository.save(user);
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getBio(), null);
    }

    // Validate session
    private void validateSession(String sessionToken) {
        if (sessionToken == null || !sessions.containsKey(sessionToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid session");
        }
    }
}