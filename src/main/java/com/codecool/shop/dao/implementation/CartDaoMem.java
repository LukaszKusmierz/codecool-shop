package com.codecool.shop.dao.implementation;

import com.codecool.shop.dao.CartDao;
import com.codecool.shop.model.Product;

import java.math.BigDecimal;
import java.util.*;

import static java.math.BigDecimal.ROUND_CEILING;

public class CartDaoMem implements CartDao {

    public List<Product> data = new ArrayList<>();
    private static CartDaoMem instance = null;

    private CartDaoMem() {
    }

    public static  CartDaoMem getInstance(){
        if( instance == null) {
            instance = new CartDaoMem();
        }
        return instance;
    }

    @Override
    public void add(Product cartItem) {
        cartItem.setId(data.size()+1);
        data.add(cartItem);
    }

    @Override
    public Product find(int id) {
        return data.stream().filter(t -> t.getId()== id).findFirst().orElse(null);
    }

    @Override
    public void remove(int id) {
        data.remove(find(id));
    }

    @Override
    public List<Product> getAll() {
        return data;
    }

    @Override
    public BigDecimal getTotalPrice(List<Product> data) {
        BigDecimal totalPrice = new BigDecimal("0.00");
        for (Product item: data) {
            BigDecimal itemPrice = item.getDefaultPrice().setScale(2, ROUND_CEILING);
            totalPrice = totalPrice.add(itemPrice);
        }
        return totalPrice;
    }



}
