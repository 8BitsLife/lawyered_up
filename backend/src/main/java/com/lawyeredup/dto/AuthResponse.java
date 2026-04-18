package com.lawyeredup.dto;

public record AuthResponse(
    boolean success,
    String message,
    UserPayload user) {

  public record UserPayload(
      Long id,
      String firstName,
      String lastName,
      String email,
      String role) {}
}
