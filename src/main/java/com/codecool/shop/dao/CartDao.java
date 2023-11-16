package com.codecool.shop.dao;


import com.codecool.shop.model.Product;


import java.math.BigDecimal;
import java.util.List;

public interface CartDao {
    void add(Product product);
    Product find(int id);
    void remove(int id);
    List<Product> getAll();
    BigDecimal getTotalPrice(List<Product> data);



}
