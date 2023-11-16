const selectElementCategory = document.getElementById('category');
const selectElementSupplier = document.getElementById('supplier');
const addCartButtons = document.querySelectorAll('a[data-product-id]');
const removeButtons = document.querySelectorAll('.removeIcon');
const elementsWithIdRemove = document.querySelectorAll('[id=idRemove]')
const actualNumbers = document.querySelectorAll(`.numberOfQuantity[data-cartItem-id]`);
const addQuantityButtons = document.querySelectorAll(`.addQuantity`);
const oddQuantityButtons = document.querySelectorAll(`.oddQuantity`);

addQuantityButtons.forEach(button => {
    button.addEventListener("click", addQuantityFunction);
});

oddQuantityButtons.forEach(button => {
    button.addEventListener("click", oddQuantityFunction);
});

addCartButtons.forEach(button => {
    button.addEventListener("click", addProductToCart);
});

elementsWithIdRemove.forEach(element => {
    element.addEventListener("click", removeLineItem);
});


selectElementCategory.addEventListener("change", optionCategory);
selectElementSupplier.addEventListener("change", optionSupplier);


function fetchProductsByCategory(route) {
    try {
        const toFetch = `http://localhost:8080/products/get${route}`
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


function showDefaultTextInOption(data) {
    data.value = '--Please choose--';
}

function optionCategory(event) {
    const selectedOption = selectElementCategory.options[selectElementCategory.selectedIndex];
    const categoryId = selectedOption.getAttribute('data-category-id');
    event.preventDefault();
    if (categoryId) {
        fetchProductsByCategory(`?categoryId=${categoryId}`)
        showDefaultTextInOption(selectElementSupplier)
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
    updateEventListeners()
}

function optionSupplier(event) {
    const selectedOption = selectElementSupplier.options[selectElementSupplier.selectedIndex];
    const supplierId = selectedOption.getAttribute('data-supplier-id');
    event.preventDefault();
    if (supplierId) {
        fetchProductsBySupplier(`?supplierId=${supplierId}`)
        showDefaultTextInOption(selectElementCategory)
    }
}

function fetchProductsBySupplier(route) {
    try {
        const toFetch = `http://localhost:8080/supplier/get${route}`
        console.log("Fetching from " + toFetch)
        fetch(toFetch, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => showProductsBySupplier(data))
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

function showProductsBySupplier(products) {
    const container = document.querySelector('.container');
    const categoryNameContainer = document.getElementById('categoryName');
    const productContainer = document.getElementById('products');

    categoryNameContainer.innerHTML = `
             <strong> ${selectElementSupplier.options[selectElementSupplier.selectedIndex].innerHTML}</strong>
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
    updateEventListeners();
}


function addProductToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-product-id');
    event.preventDefault();
    if (productId) {
        fetchAddProductToCart(productId)
        // changeNumber();
    }
}


function updateEventListeners() {
    const addCartButtons = document.querySelectorAll('a[data-product-id]');
    addCartButtons.forEach(button => {
        button.addEventListener("click", addProductToCart);
    });
}

// function getNumberOfItem() {
//     if(menu){
//         console.log("menu")
//         fetchNumberOfItemInCart()
//     }
//
// }
// fetchNumberOfItemInCart();

// function fetchNumberOfItemInCart() {
//     try {
//         console.log("try to fetch: ")
//         const toFetch = `http://localhost:8080/cart/items/numbers`
//         console.log(" fetch:  " + toFetch)
//         fetch(toFetch, {
//             method: "PUT",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'number': 'number'
//             },
//             body: JSON.stringify({numberOfItemInCart})
//         })
//             .then((response) => {
//                 const numberHeader = response.headers.get('number');
//                 console.log("Number header value: " + numberHeader);
//                 document.getElementById('numberDisplay').textContent = numberHeader
//                 return response.json();
//             })
//             .then((data) => console.log(JSON.stringify(data)))
//             .catch(error => {
//                 console.log(error)
//             })
//     } catch (error) {
//         console.log(error)
//     }
// }

function fetchAddProductToCart(productId) {
    try {
        console.log("try to fetch: ")
        const toFetch = `http://localhost:8080/cart/items`
        console.log(" fetch:  " + toFetch)
        fetch(toFetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Header': 'number'
            },
            body: JSON.stringify({productId: parseInt(productId)})
        })
            .then((response) => {
                const numberHeader = response.headers.get('number');
                console.log("Number header value: " + numberHeader);
                document.querySelector('.amountItem-info').textContent = numberHeader
                return response.json();
            })
            .then((data) => console.log("data " + data))
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}


function removeLineItem(event) {
    const button = event.target;
    const itemId = button.getAttribute('data-cartItem-id');
    event.preventDefault();
    if (itemId) {
        fetchDeleteProductFromCart(`?itemId=${itemId}`)
    }
}

function fetchDeleteProductFromCart(route) {
    try {
        console.log("try to fetch: ")
        const toFetch = `http://localhost:8080/cart/items${route}`
        console.log(" fetch:  " + toFetch)
        fetch(toFetch, {
            method: "DELETE",
        })
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

function addQuantityFunction(event) {
    const button = event.target;
    const itemId = button.getAttribute('data-cartItem-id');
    console.log(itemId)
    event.preventDefault();
    actualNumbers.forEach(number => {
        if (number.getAttribute('data-cartItem-id') === itemId) {
            number.value = parseInt(number.value) + 1;
            subtotalValue(itemId, number)
        }
    })
}

function oddQuantityFunction(event) {
    const button = event.target;
    const itemId = button.getAttribute('data-cartItem-id');
    event.preventDefault();
    actualNumbers.forEach(number => {
        if (number.value > 0) {
            if (number.getAttribute('data-cartItem-id') === itemId) {
                number.value = parseInt(number.value) - 1;
                subtotalValue(itemId, number)
                if (parseInt(number.value) === 0) {
                    fetchDeleteProductFromCart(`?itemId=${itemId}`)
                }
            }
        }
    })
}


function subtotalValue(itemId, actualQuantityNumber){
    const subValues = document.querySelectorAll(`.itemPriceSum`);
    const itemValues = document.querySelectorAll(`.itemPrice`);
    subValues.forEach(valueNumber => {
        itemValues.forEach(itemNumber => {

            if ((valueNumber.getAttribute('data-cartItem-id') === itemId && itemNumber.getAttribute('data-cartItem-id') === itemId)) {
                const newValue = parseFloat(itemNumber.innerHTML) * (parseFloat(actualQuantityNumber.value));
                console.log(newValue.toFixed(2))
                valueNumber.innerHTML = newValue.toFixed(2);
                console.log(valueNumber.innerHTML)
            }
        })
    })


}





