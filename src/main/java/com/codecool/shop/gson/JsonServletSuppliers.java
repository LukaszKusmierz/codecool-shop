package com.codecool.shop.gson;

import com.codecool.shop.dao.ProductDao;
import com.codecool.shop.dao.SupplierDao;
import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.dao.implementation.SupplierDaoMem;
import com.codecool.shop.gson.GsonClass;
import com.codecool.shop.model.Product;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "JsonServletSupplier", urlPatterns = "/supplier/get", loadOnStartup = 3)
public class JsonServletSuppliers extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ProductDao productDataStore = ProductDaoMem.getInstance();
        SupplierDao supplierDao = SupplierDaoMem.getInstance();

        int supplierId = 1;
        if (request.getParameter("supplierId") != null) {
            supplierId = Integer.parseInt(request.getParameter("supplierId"));
        }

        List<Product> productsListbySupplier = productDataStore.getBy(supplierDao.find(supplierId));
        GsonClass gsonClass = new GsonClass();
        gsonClass.convertToGson();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gsonClass.convertToGson().toJson(productsListbySupplier));
    }
}
