package com.codecool.shop.config;

import com.codecool.shop.dao.ProductCategoryDao;
import com.codecool.shop.dao.ProductDao;
import com.codecool.shop.dao.SupplierDao;
import com.codecool.shop.dao.implementation.ProductCategoryDaoMem;
import com.codecool.shop.dao.implementation.ProductDaoMem;
import com.codecool.shop.dao.implementation.SupplierDaoMem;
import com.codecool.shop.model.Product;
import com.codecool.shop.model.ProductCategory;
import com.codecool.shop.model.Supplier;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import java.math.BigDecimal;

@WebListener
public class Initializer implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ProductDao productDataStore = ProductDaoMem.getInstance();
        ProductCategoryDao productCategoryDataStore = ProductCategoryDaoMem.getInstance();
        SupplierDao supplierDataStore = SupplierDaoMem.getInstance();

        Supplier amazon = new Supplier("Amazon", "Digital content and services");
        supplierDataStore.add(amazon);
        Supplier lenovo = new Supplier("Lenovo", "Computers");
        supplierDataStore.add(lenovo);
        Supplier samsung = new Supplier("Samsung", "Specializes in the production of a wide variety of consumer and industry electronics");
        supplierDataStore.add(samsung);
        Supplier apple = new Supplier("Apple", "Computers,services, accessories.");
        supplierDataStore.add(apple);
        Supplier lg = new Supplier("LG", "Technology innovator in consumer electronics, home appliances and mobile communications.");
        supplierDataStore.add(lg);

        ProductCategory tablet = new ProductCategory("Tablet", "Hardware", "A tablet computer, commonly shortened to tablet, is a thin, flat mobile computer with a touchscreen display.");
        productCategoryDataStore.add(tablet);

        ProductCategory earphones = new ProductCategory("Earphones", "Hardware", "Experience audio excellence with our premium earphones, delivering crystal-clear sound and unmatched comfort for a truly immersive listening experience.");
        productCategoryDataStore.add(earphones);

        ProductCategory laptop= new ProductCategory("Laptop", "Hardware", "Our state-of-the-art laptop, boasting top-tier performance, sleek design, and cutting-edge features for all your computing needs.");
        productCategoryDataStore.add(laptop);

        productDataStore.add(new Product(1,"Amazon Fire", new BigDecimal("49.90"), "USD", "Fantastic price. Large content ecosystem. Good parental controls. Helpful technical support.", tablet, amazon));
        productDataStore.add(new Product(2,"Lenovo IdeaPad Miix 700", new BigDecimal("479.00"), "USD", "Keyboard cover is included. Fanless Core m5 processor. Full-size USB ports. Adjustable kickstand.", tablet, lenovo));
        productDataStore.add(new Product(3,"Amazon Fire HD 8", new BigDecimal("89.00"), "USD", "Amazon's latest Fire HD 8 tablet is a great value for media consumption. You will enjoy browsing the web.", tablet, amazon));
        productDataStore.add(new Product(4,"Apple iPad 10.2\" (9. gen.)", new BigDecimal("829.90"), "USD", "Intuitive. Efficient. Versatile. iPad is made for everything you love to do. For work, play, creation, learning, communication and lots of other things.", tablet, apple));
        productDataStore.add(new Product(5,"SAMSUNG Galaxy tab. S9", new BigDecimal("987.00"), "USD", "A fast 8-core processor guarantees trouble-free use of the tablet. You will enjoy browsing the web, watching movies and listening to music, as well as playing and chatting with friends.", tablet, samsung));
        productDataStore.add(new Product(6,"Tablet APPLE iPad Pro 11", new BigDecimal("1322.00"), "USD", "The M2 chip takes iPad Pro to a whole new level of performance. It has been designed for you to maximize performance and technology while being highly energy efficient.", tablet, apple));

        productDataStore.add(new Product(7,"JLab GO Air Tones True Wireless Earbuds", new BigDecimal("24.99"), "USD", " Go Air Tones are perfectly pocket-sized with a powerful punch. With 32+ hours of total playtime and the smaller fit ever, the slim case GOes wherever you go. ", earphones, lenovo ));
        productDataStore.add(new Product(8,"JLab GO Air POP True Wireless In-Ear Headphones", new BigDecimal("25.99"), "USD", "Go Air POP are perfectly pocket-sized with a powerful punch. With a lot of hours of total playtime and a small fit. Long battery life. Incredible sound. Touch controls. ", earphones, lenovo));
        productDataStore.add(new Product(9,"Baseus Bowie MA10 wireless Bluetooth headphones", new BigDecimal("28.99"), "USD", "Baseus Bowie MA10 are Bluetooth headphones with the highest sound quality that recommend to all pop music fans. 140 hours of playback and 1.5 hour quick charge.", earphones, amazon));
        productDataStore.add(new Product(10,"AirPods Pro (2nd generation) with MagSafe Charging Case (USB-C)", new BigDecimal("378.99"), "USD", "Contact mode limits and eliminates loud sounds 48,000 times per second, so you stay in comfortable contact with the world in any environment. ", earphones, apple));
        productDataStore.add(new Product(11,"LG TONE Free T90 Dolby Atmos Wireless Earbuds", new BigDecimal("299.99"), "USD", "LG TONE Free T90 is the world's first Dolby Atmos wireless earbuds with Dolby Head TrackingTM across all your favourite entertainment-music, movies, TV, games.", earphones, lg));
        productDataStore.add(new Product(12,"Samsung Galaxy Buds2 Pro SM-R510NLV wireless headphones-in-ear ", new BigDecimal("245.89"), "USD", "Perfect sound thanks to noise cancellation (ANC) with ambient sound mode. Choose the highest quality Hi-Fi sound with 24 bit processing. ", earphones, samsung));

        productDataStore.add(new Product(13,"Lenovo Legion 9-16", new BigDecimal("4100.00"), "USD", "Luxury in its purest form. Is not only a powerful gaming machine, but also a versatile tool for creative souls. Equipped with a 13th generation Intel processor and NVIDIA GeForce RTX 40 graphics, this laptop removes all limitations.", laptop, lenovo));
        productDataStore.add(new Product(14,"Laptop LENOVO IdeaPad 3 15ITL6 15.6", new BigDecimal("620.99"), "USD", "The efficient Intel Core i5-1135G7 processor. This 4-core model has a base clock of 2.4 GHz. The laptop has one USB 3.0 connector , a USB 2.0 connector, and a USB 3.1 Type C connector, as well as an HDMI output.", laptop, lenovo));
        productDataStore.add(new Product(15,"Lenovo Legion 5 Pro-16", new BigDecimal("1195.88"), "USD", "Created with one purpose-to take you to the highest rungs of the gaming ladder. NVIDIA® GeForce RTX™ 30 Series laptop GPUs power the world's fastest gaming and creator laptop. 16-inch WUXGA display with a 16:10 screen aspect ratio.", laptop, lenovo));
        productDataStore.add(new Product(16,"Apple MacBook Air M2/8GB/256/Mac", new BigDecimal("1335.89"), "USD", "A powerful, solid Apple MacBook Air M2 | laptop 13.6-2560 x 1664 | 8GB | 512GB | Mac OS | US | Silver, which is perfect for the office and home. Very solid casing and an elegant, modern design. ", laptop, apple));
        productDataStore.add(new Product(17,"APPLE MACBOOK PRO M2 MAX 16.2", new BigDecimal("4223.89"), "USD", "The heart of the MacBook is the powerful Apple M2 Max chip, supported by 32GB of RAM and a disk SSD with a capacity of 1TB. . The keyboard includes a dedicated Touch ID button that allows you to safely unlock, log in to apps or pay with Apple Pay.", laptop, apple));
    }
}
