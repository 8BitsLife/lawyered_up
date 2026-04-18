package com.lawyeredup.service;

import com.lawyeredup.dto.AuthLoginRequest;
import com.lawyeredup.dto.AuthResponse;
import com.lawyeredup.dto.AuthSignupRequest;
import com.lawyeredup.model.User;
import com.lawyeredup.model.UserRole;
import com.lawyeredup.repository.UserRepository;
import java.util.Locale;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public AuthService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public AuthResponse signup(AuthSignupRequest request) {
    String normalizedEmail = request.email().trim().toLowerCase(Locale.ROOT);

    if (userRepository.existsByEmail(normalizedEmail)) {
      throw new IllegalArgumentException("An account with this email already exists.");
    }

    User user = new User();
    user.setFirstName(request.firstName().trim());
    user.setLastName(request.lastName().trim());
    user.setEmail(normalizedEmail);
    user.setRole(UserRole.valueOf(request.role().trim().toUpperCase(Locale.ROOT)));
    user.setPasswordHash(passwordEncoder.encode(request.password()));

    User saved = userRepository.save(user);
    return new AuthResponse(
        true,
        "Account created successfully.",
        mapUser(saved));
  }

  public AuthResponse login(AuthLoginRequest request) {
    String normalizedEmail = request.email().trim().toLowerCase(Locale.ROOT);

    User user = userRepository.findByEmail(normalizedEmail)
        .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw new IllegalArgumentException("Invalid email or password.");
    }

    return new AuthResponse(
        true,
        "Login successful.",
        mapUser(user));
  }

  private AuthResponse.UserPayload mapUser(User user) {
    return new AuthResponse.UserPayload(
        user.getId(),
        user.getFirstName(),
        user.getLastName(),
        user.getEmail(),
        user.getRole().name());
  }
}
