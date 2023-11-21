package com.codecool.shop.dao;


import com.codecool.shop.model.LineItem;
import com.codecool.shop.model.Product;


import java.math.BigDecimal;
import java.util.List;

public interface CartDao {
    void add(LineItem lineItem);
    LineItem find(int id);
    void remove(int id);
    List<LineItem> getAll();
    BigDecimal getTotalPrice(List<LineItem> data);
}
