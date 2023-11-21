package com.codecool.shop.model;

import java.util.List;

public class Order {

    private String personalDataClient;
    private String paymentDataClient;

    private List<LineItem> allBuyProducts;

    public Order() {
    }

    public String getPersonalDataClient() {
        return personalDataClient;
    }

    public void setPersonalDataClient(String personalDataClient) {
        this.personalDataClient = personalDataClient;
    }

    public String getPaymentDataClient() {
        return paymentDataClient;
    }

    public void setPaymentDataClient(String paymentDataClient) {
        this.paymentDataClient = paymentDataClient;
    }

    public List<LineItem> getAllBuyProducts() {
        return allBuyProducts;
    }

    public void setAllBuyProducts(List<LineItem> allBuyProducts) {
        this.allBuyProducts = allBuyProducts;
    }
}
