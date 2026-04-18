package com.lawyeredup.controller;

import com.lawyeredup.dto.AuthLoginRequest;
import com.lawyeredup.dto.AuthResponse;
import com.lawyeredup.dto.AuthSignupRequest;
import com.lawyeredup.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/signup")
  public AuthResponse signup(@Valid @RequestBody AuthSignupRequest request) {
    return authService.signup(request);
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody AuthLoginRequest request) {
    return authService.login(request);
  }
}
