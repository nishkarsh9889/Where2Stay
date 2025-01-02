package com.hotel_app.where2stay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hotel_app.where2stay.dto.PaymentResponse;
import com.hotel_app.where2stay.entity.Booking;
import com.hotel_app.where2stay.services.interfac.IPaymentService;
import com.stripe.exception.StripeException;

@RestController
public class PaymentController {

    @Autowired
    private IPaymentService paymentService;

    @PostMapping("/payment/create-session")
    public ResponseEntity<PaymentResponse> createStripeSession(@RequestBody Booking booking) {
        try {
            PaymentResponse response = paymentService.createPaymentLink(booking);
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new PaymentResponse());
        }
    }
}