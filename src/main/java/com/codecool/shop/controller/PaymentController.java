package com.codecool.shop.controller;

import com.codecool.shop.config.TemplateEngineUtil;
import com.codecool.shop.dao.CartDao;
import com.codecool.shop.dao.implementation.CartDaoMem;
import com.codecool.shop.model.LineItem;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.web.IWebExchange;
import org.thymeleaf.web.servlet.JakartaServletWebApplication;

import java.io.IOException;
import java.math.BigDecimal;

@WebServlet(urlPatterns = {"/payment"})
public class PaymentController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        CartDao cartDao = CartDaoMem.getInstance();
        TemplateEngine engine = TemplateEngineUtil.getTemplateEngine(req.getServletContext());
        IWebExchange webExchange = JakartaServletWebApplication.buildApplication(getServletContext())
                .buildExchange(req, resp);
        WebContext context = new WebContext(webExchange);

        double totalPrice = 0;
        for (LineItem item : cartDao.getAll()) {
            totalPrice += item.subTotal();
        }
        int numberItems = cartDao.getAll().stream().mapToInt(lineItem1-> lineItem1.getQuantityOfSell()).sum();
        context.setVariable("numberItems", numberItems);
        context.setVariable("totalPrice", BigDecimal.valueOf(totalPrice).setScale(2, BigDecimal.ROUND_CEILING));
        context.setVariable("ctxPath", req.getContextPath());
        engine.process("product/payment.html", context, resp.getWriter());
    }
}
