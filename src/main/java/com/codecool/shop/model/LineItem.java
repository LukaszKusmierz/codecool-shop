package com.codecool.shop.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class LineItem{

    private int id;
    private String name;
    private Product product;

    private int quantityOfSell;
    private BigDecimal unitPriceProduct;
    private BigDecimal subTotalPrice;




    public LineItem(int id, String name, Product product, BigDecimal unitPriceProduct) {
        this.id = id;
        this.name = name;
        this.product = product;
        this.unitPriceProduct = unitPriceProduct;
        this.quantityOfSell = 0;
    }

    public double subTotal() {
        BigDecimal itemPrice = unitPriceProduct.multiply(BigDecimal.valueOf(quantityOfSell));
        itemPrice = itemPrice.setScale(2, BigDecimal.ROUND_HALF_UP);
        return itemPrice.doubleValue();
    }
    public BigDecimal subTotal1() {
        BigDecimal itemPrice = unitPriceProduct.multiply(BigDecimal.valueOf(quantityOfSell));
        itemPrice = itemPrice.setScale(2, BigDecimal.ROUND_HALF_UP);
        return itemPrice;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantityOfSell() {
        return quantityOfSell;
    }

    public void setQuantityOfSell(int quantityOfSell) {
        this.quantityOfSell = quantityOfSell;
    }

    public BigDecimal getUnitPriceProduct() {
        return unitPriceProduct;
    }

    public void setUnitPriceProduct(BigDecimal unitPriceProduct) {
        this.unitPriceProduct = unitPriceProduct;
    }

    public BigDecimal getSubTotalPrice() {
        return subTotalPrice;
    }

    public void setSubTotalPrice(BigDecimal subTotalPrice) {
        this.subTotalPrice = subTotalPrice;
    }
}
