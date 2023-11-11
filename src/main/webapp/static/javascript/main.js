const selectElement = document.getElementById('category');
selectElement.addEventListener("change",optionCategory);

    function fetchCategory(route) {
    try {
        console.log("try fetch" + route)
        const toFetch =`http://localhost:8080/products/get${route}`
        console.log("Fetching from " + toFetch)

        fetch(toFetch, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => renderCategory(data))
            .catch(error => {
                console.log(error)
            })
    }catch (error) {
        console.log(error)
    }
}

function optionCategory(event) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];

        const categoryId = selectedOption.getAttribute('data-category-id');
        event.preventDefault();
        if (categoryId) {
            fetchCategory(`?categoryId=${categoryId}`)
        }
}

function renderCategory(products) {
    const container = document.getElementById('container');
    const categoryNameContainer = document.getElementById('categoryName');
    const productContainer = document.getElementById('products');

    categoryNameContainer.innerHTML='';
    const cardName = document.createElement('div');
    cardName.classList.add('card');
    cardName.innerHTML = `
             <strong> ${selectElement.options[selectElement.selectedIndex].innerHTML}</strong>
      `
    productContainer.innerHTML = '';
    products.forEach((prod) => {
        const card = document.createElement('div');
        card.classList.add('col', 'col-sm-12', 'col-md-6', 'col-lg-4');
        card.innerHTML = `
            
             <div id="products" class="row">
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
                        <a class="btn btn-success" href="#">Add to cart</a>
                    </div>
                </div>
            </div>
        `;
        categoryNameContainer.append(cardName)
        productContainer.append(card);
    });
    container.append(categoryNameContainer);
    container.append(productContainer);
}

