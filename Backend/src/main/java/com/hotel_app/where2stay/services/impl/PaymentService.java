package com.hotel_app.where2stay.services.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.hotel_app.where2stay.dto.PaymentResponse;
import com.hotel_app.where2stay.entity.Booking;
import com.hotel_app.where2stay.services.interfac.IPaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentService implements IPaymentService {

        @Value("${stripe.secret.key}")
        private String stripeSecretKey;

        @Override
        public PaymentResponse createPaymentLink(Booking booking) throws StripeException {

                Stripe.apiKey = stripeSecretKey;
                SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(
                                SessionCreateParams.PaymentMethodType.CARD)
                                .setMode(SessionCreateParams.Mode.PAYMENT)
                                .setSuccessUrl("https://where-2-stay.vercel.app/payment/success/")
                                .setCancelUrl("https://where-2-stay.vercel.app/payment/failed/")
                                .addLineItem(SessionCreateParams.LineItem.builder()
                                                .setQuantity(1L)
                                                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                                                .setCurrency("usd")
                                                                .setUnitAmount(25L * 100)
                                                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData
                                                                                .builder()
                                                                                .setName("Hotel stay")
                                                                                .build())
                                                                .build())
                                                .build())
                                .build();

                Session session = Session.create(params);
                System.out.println("bookingID: " + booking.getId());

                PaymentResponse res = new PaymentResponse();
                res.setPayment_url(session.getUrl());

                return res;
        }
}