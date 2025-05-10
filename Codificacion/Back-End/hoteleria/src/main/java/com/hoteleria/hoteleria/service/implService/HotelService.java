package com.hoteleria.hoteleria.service.implService;

import com.hoteleria.hoteleria.model.Hotel;
import com.hoteleria.hoteleria.repository.HotelRepository;
import com.hoteleria.hoteleria.service.interfaces.IHotelService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class HotelService implements IHotelService {

  private final HotelRepository hotelRepository;

  @Override
  public Optional<Hotel> findHotelById(UUID id) {
    return hotelRepository.findById(id);
  }

  @Override
  public List<Hotel> findAllHotels() {
    return hotelRepository.findAll();
  }

  @Override
  public Hotel save(Hotel hotel) {
    return hotelRepository.save(hotel);
  }
}
