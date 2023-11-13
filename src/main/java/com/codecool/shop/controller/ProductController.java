package com.codecool.shop.controller;

import com.codecool.shop.dao.ProductCategoryDao;
import com.codecool.shop.dao.ProductDao;
import com.codecool.shop.dao.SupplierDao;
import com.codecool.shop.dao.implementation.ProductCategoryDaoMem;
import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.dao.implementation.SupplierDaoMem;
import com.codecool.shop.service.ProductService;
import com.codecool.shop.config.TemplateEngineUtil;
import com.codecool.shop.service.SupplierService;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.thymeleaf.web.IWebExchange;
import org.thymeleaf.web.servlet.JakartaServletWebApplication;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = {"/"})
public class ProductController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ProductDao productDataStore = ProductDaoMem.getInstance();
        ProductCategoryDao productCategoryDataStore = ProductCategoryDaoMem.getInstance();
        SupplierDao supplierDataStore = SupplierDaoMem.getInstance();
        ProductService productService = new ProductService(productDataStore,productCategoryDataStore,supplierDataStore);
        SupplierService supplierService = new SupplierService(supplierDataStore);

        TemplateEngine engine = TemplateEngineUtil.getTemplateEngine(req.getServletContext());
        IWebExchange webExchange = JakartaServletWebApplication.buildApplication(getServletContext())
                .buildExchange(req, resp);
        WebContext context = new WebContext(webExchange);

        if (req.getParameter("supplierId") != null) {
            int supplierId = Integer.parseInt(req.getParameter("supplierId"));
            String selectedSupplierName;
            if (supplierId == 0) {
                selectedSupplierName = "All Suppliers";
            } else {
                selectedSupplierName = supplierService.getSupplierNameById(supplierId);
            }
            context.setVariable("selectedSupplier", supplierId);
            context.setVariable("selectedSupplierName", selectedSupplierName);
            context.setVariable("products", productService.getProductsBySupplier(supplierId));
        } else {
            context.setVariable("selectedSupplier", 0);
            context.setVariable("selectedSupplierName", "All Suppliers");
            context.setVariable("products", productService.getAllProducts());
        }

        context.setVariable("category", productService.getAllProductCategories());
        context.setVariable("suppliers", supplierService.getAllSuppliers());
        engine.process("product/index.html", context, resp.getWriter());
//        if (req.getRequestURI().equals("/update-content")) {
//            engine.process("product/product-cards.html", context, resp.getWriter());
//        } else {
//            engine.process("product/index.html", context, resp.getWriter());
//        }
    }

}
