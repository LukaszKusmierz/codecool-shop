package com.codecool.shop.gson;

import com.codecool.shop.dao.CartDao;
import com.codecool.shop.dao.implementation.CartDaoMem;
import com.codecool.shop.model.Order;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;


@WebServlet(name = "JsonServletPayment", urlPatterns = "/payment/paymentData", loadOnStartup = 3)
public class JsonServletFormDataPayment extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Order order =new Order();
        CartDao cartDao = CartDaoMem.getInstance();

        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        String stringPaymentDataClient = stringBuilder.toString();
        order.setPaymentDataClient(stringPaymentDataClient);

        cartDao.getAll().removeAll(cartDao.getAll());
    }
}


