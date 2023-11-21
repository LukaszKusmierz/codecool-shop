package com.codecool.shop.gson;

import com.codecool.shop.model.Order;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;


@WebServlet(name = "JsonServletCheckOut", urlPatterns = "/checkoutCart/personalData", loadOnStartup = 3)
public class JsonServletFormDataPersonalData extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Order order =new Order();

        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        String stringDataClient = stringBuilder.toString();
        order.setPersonalDataClient(stringDataClient);
    }
}


