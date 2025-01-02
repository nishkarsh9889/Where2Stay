package com.hotel_app.where2stay.services.interfac;

import com.hotel_app.where2stay.dto.PaymentResponse;
import com.hotel_app.where2stay.entity.Booking;
import com.stripe.exception.StripeException;

public interface IPaymentService {
    public PaymentResponse createPaymentLink(Booking booking) throws StripeException;
}
