package com.hoteleria.hoteleria.controller;

import com.hoteleria.hoteleria.model.Hotel;
import com.hoteleria.hoteleria.service.interfaces.IHotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
public class HotelController {

  private final IHotelService hotelService;

  @GetMapping("/{id}")
  public ResponseEntity<Hotel> getHotelById(@PathVariable UUID id) {
    Optional<Hotel> hotel = hotelService.findHotelById(id);
    return hotel.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<Hotel>> getAllHotels() {
    return ResponseEntity.ok(hotelService.findAllHotels());
  }

  @PostMapping
  public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
    Hotel savedHotel = hotelService.save(hotel);
    return ResponseEntity.ok(savedHotel);
  }
}
