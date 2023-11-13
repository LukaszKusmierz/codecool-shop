const selectElementCategory = document.getElementById('category');
selectElementCategory.addEventListener("change",optionCategory);

function fetchProductsByCategory(route) {
    try {
        const toFetch =`http://localhost:8080/products/get${route}`
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
    }catch (error) {
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
     const container = document.querySelector('.container');
    const categoryNameContainer = document.getElementById('categoryName');
    const productContainer = document.getElementById('products');

    categoryNameContainer.innerHTML = `
             <strong> ${selectElementCategory.options[selectElementCategory.selectedIndex].innerHTML}</strong>
      `
    productContainer.innerHTML = '';
    products.forEach((prod) => {
        const cardProducts = document.createElement('div');
        cardProducts.classList.add('col', 'col-sm-12', 'col-md-6', 'col-lg-4');
        cardProducts.innerHTML = `
            
             <div class="card">
                <img src="/static/img/product_${prod.id}.jpg">
                <div class="card-header">
                    <h4 class="card-title">${prod.name}</h4>
                    <p class="card-text">${prod.description}</p>
                </div>
                <div class="card-body">
                    <div class="card-text">
                        <p class="lead">${prod.defaultPrice}  ${prod.defaultCurrency}</p>
                    </div>
                    <div class="card-text">
                        <a data-product-id=${prod.id} class="btn btn-success" href="#">Add to cart</a>
                    </div>
                </div>
            </div>
        `;
        productContainer.appendChild(cardProducts);

    });
    container.append(categoryNameContainer);
    container.appendChild(productContainer);

}

