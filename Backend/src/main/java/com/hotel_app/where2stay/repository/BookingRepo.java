package com.hotel_app.where2stay.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hotel_app.where2stay.entity.Booking;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingConfirmationCode(String bookingConfirmationCode);
}
