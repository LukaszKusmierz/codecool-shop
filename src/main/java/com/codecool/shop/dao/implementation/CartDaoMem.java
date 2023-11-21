package com.codecool.shop.dao.implementation;

import com.codecool.shop.dao.CartDao;
import com.codecool.shop.model.LineItem;
import java.math.BigDecimal;
import java.util.*;

import static java.math.BigDecimal.ROUND_CEILING;

public class CartDaoMem implements CartDao {

    public List<LineItem> data = new ArrayList<>();


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
    public void add(LineItem lineItem) {
        lineItem.setId(lineItem.getId());
        data.add(lineItem);
    }

    @Override
    public LineItem find(int id) {
        return data.stream().filter(t -> t.getId() == id).findFirst().orElse(null);
    }

    @Override
    public void remove(int id) {
        data.remove(find(id));
    }

    @Override
    public List<LineItem> getAll() {
        return data;
    }

    @Override
    public BigDecimal getTotalPrice(List<LineItem> data) {
        BigDecimal totalPrice = new BigDecimal("0.00");
        for (LineItem item: data) {

            BigDecimal itemPrice = item.getUnitPriceProduct().setScale(2, ROUND_CEILING);
            totalPrice = totalPrice.add(itemPrice);
        }
        return totalPrice;
    }
}
