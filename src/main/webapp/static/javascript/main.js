const selectElementCategory = document.getElementById('category');
selectElementCategory.addEventListener("change", optionCategory);

function fetchProductsByCategory(route) {
    try {
        const toFetch = `http://localhost:8080/products/get${route}`
        console.log("Fetching from " + toFetch)
        fetch(toFetch, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => showProductsByCategory(data))
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}


function optionCategory(event) {
    const selectedOption = selectElementCategory.options[selectElementCategory.selectedIndex];
    const categoryId = selectedOption.getAttribute('data-category-id');
    event.preventDefault();
    if (categoryId) {
        fetchProductsByCategory(`?categoryId=${categoryId}`)
    }
}


function showProductsByCategory(products) {
    const container = document.getElementById('main');
    const categoryNameContainer = document.getElementById('categoryName');
    const productContainer = document.getElementById('products');

    categoryNameContainer.innerHTML = `
             <strong> ${selectElementCategory.options[selectElementCategory.selectedIndex].innerHTML}</strong>
      `
    productContainer.innerHTML = '';
    products.forEach((prod) => {
        const cardProducts = document.createElement('div');
        cardProducts.classList.add('product');
        cardProducts.innerHTML = `  
                <img src="/static/img/product_${prod.id}.jpg">                                
                <h3 class="card-title">${prod.name}</h3>
                <p class="card-text">${prod.description}</p>                               
                <h5 class="lead">${prod.defaultPrice}  ${prod.defaultCurrency}</h5>
                <button data-product-id=${prod.id}>Add to cart</button>                
                     
        `;
        productContainer.appendChild(cardProducts);

    });
    container.append(categoryNameContainer);
    container.appendChild(productContainer);

}

document.addEventListener('DOMContentLoaded', function () {
    var filterForm = document.getElementById('filterForm');
    var supplierDropdown = document.getElementById('supplier');

    supplierDropdown.addEventListener('change', function () {
        filterForm.submit();
    });
});

