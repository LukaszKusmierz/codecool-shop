package com.codecool.shop.gson;

import com.codecool.shop.model.ProductExclusionStrategy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GsonClass {

    public Gson convertToGson( ){
      Gson gson = new GsonBuilder()
                .setExclusionStrategies(new ProductExclusionStrategy())
                .serializeNulls()
                .create();
       return gson;
    }
}
