package com.codecool.shop.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class AddToCartRequest {
    private int productId;
    private String operation;
}
