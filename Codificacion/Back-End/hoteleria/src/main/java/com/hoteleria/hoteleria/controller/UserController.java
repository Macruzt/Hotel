package com.hoteleria.hoteleria.controller;

import com.hoteleria.hoteleria.model.User;
import com.hoteleria.hoteleria.model.request.AuthResponse;
import com.hoteleria.hoteleria.model.request.LoginRequest;
import com.hoteleria.hoteleria.service.interfaces.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final IUserService userService;

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable UUID id) {
    Optional<User> user = userService.findUserById(id);
    return user.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userService.findAllUsers());
  }

  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User saved = userService.register(user);
    return ResponseEntity.ok(saved);
  }

  @PostMapping(value = "login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
    return ResponseEntity.ok(userService.login(request));
  }
}
