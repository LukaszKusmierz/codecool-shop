package com.codecool.shop.model;

import java.util.ArrayList;
import java.util.List;

public class Cart {

    private List<Product> productsInCart;

    public Cart() {
        this.productsInCart = new ArrayList<>();
    }
}
