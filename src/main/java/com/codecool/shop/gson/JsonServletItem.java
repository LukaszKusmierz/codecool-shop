package com.codecool.shop.gson;

import com.codecool.shop.dao.CartDao;
import com.codecool.shop.dao.ProductDao;
import com.codecool.shop.dao.implementation.CartDaoMem;
import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.model.AddToCartRequest;
import com.codecool.shop.model.Product;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "JsonServletItem", urlPatterns = "/cart/quantity", loadOnStartup = 3)
public class JsonServletItem extends HttpServlet {
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ProductDao productDataStore = ProductDaoMem.getInstance();
        CartDao cartDao = CartDaoMem.getInstance();
        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        AddToCartRequest request = gson.fromJson(stringBuilder.toString(), AddToCartRequest.class);
        int productId = request.getProductId();
        Product product = productDataStore.find(productId);

        if("add".equals(request.getOperation())){
            if (cartDao.getAll().contains(product)) {
                product.setQuantityOfSell(product.getQuantityOfSell() + 1);
            }
        } else if ("odd".equals(request.getOperation())) {
            if (cartDao.getAll().contains(product)) {
                product.setQuantityOfSell(product.getQuantityOfSell() - 1);
            }
        }
        int numberItems=0;
        for (Product item : cartDao.getAll()) {
            numberItems += item.getQuantityOfSell();
        }

        GsonClass gsonClass = new GsonClass();
        gsonClass.convertToGson();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.setHeader("number", String.valueOf(numberItems));
        PrintWriter out = resp.getWriter();
        out.println(gsonClass.convertToGson().toJson(cartDao));
    }
}