package com.hotel_app.where2stay.services.interfac;

import com.hotel_app.where2stay.dto.Response;
import com.hotel_app.where2stay.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
