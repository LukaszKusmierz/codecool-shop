package com.codecool.shop.model;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

public class ProductExclusionStrategy implements ExclusionStrategy {

    @Override
    public boolean shouldSkipField(FieldAttributes f) {
        return(f.getDeclaringClass() == ProductCategory.class &&  f.getName().equals("products")) ||
                (f.getDeclaringClass() == Supplier.class &&  f.getName().equals("products"));
    }

    @Override
    public boolean shouldSkipClass(Class<?> aClass) {
        return false;
    }
}