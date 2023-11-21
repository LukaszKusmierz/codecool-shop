const selectElementCategory = document.getElementById('category');
const selectElementSupplier = document.getElementById('supplier');
const addCartButtons = document.querySelectorAll('a[data-product-id]');
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

if (selectElementCategory) {
    selectElementCategory.addEventListener("change", optionCategory);
}

if (selectElementCategory) {
    selectElementSupplier.addEventListener("change", optionSupplier);
}

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
                <img src="/static/img/product_${prod.id}.jpg" alt="product">
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
                <img src="/static/img/product_${prod.id}.jpg" alt="productBySupplier">
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
    }
}

function updateEventListeners() {
    const addCartButtons = document.querySelectorAll('a[data-product-id]');
    addCartButtons.forEach(button => {
        button.addEventListener("click", addProductToCart);
    });
}

function fetchAddProductToCart(productId) {
    try {
        console.log("try to fetch: ")
        console.log(productId)
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
                document.querySelector('.amountItem-info').textContent = response.headers.get('number')
                console.log(response.json())
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

function removeLineItem(event) {
    const button = event.target;
    // const itemId = button.getAttribute('data-cartItem-id');
    const productId = button.getAttribute('data-product-id');
    event.preventDefault();
    if (productId) {
        fetchDeleteProductFromCart(`?productId=${productId}`)
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

function fetchAddQuantityToCart(productId, operation) {
    try {
        console.log("try to fetch: ")
        const toFetch = `http://localhost:8080/cart/quantity`
        console.log(" fetch:  " + toFetch)
        fetch(toFetch, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Header': 'number'
            },
            body: JSON.stringify({productId: parseInt(productId), operation: operation})
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error Status: ${response.status}`);
                }
                document.querySelector('.amountItem-info').textContent = response.headers.get('number');
            })
            .then(() => {
                window.location.reload()
            })
            .then((data) => console.log("data " + data))
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
    const productId = button.getAttribute('data-product-id');

    console.log( "addQuantityFunction  "+productId)
    event.preventDefault();
    actualNumbers.forEach(number => {
        if (number.getAttribute('data-cartItem-id') === itemId) {
            number.value = parseInt(number.value) + 1;
            subtotalValue(itemId, number)
        }
    })
    fetchAddQuantityToCart(productId, "add");
}

function oddQuantityFunction(event) {
    const button = event.target;
    const itemId = button.getAttribute('data-cartItem-id');
    const productId = button.getAttribute('data-product-id');
    event.preventDefault();
    actualNumbers.forEach(number => {
        if (parseInt(number.value) > 0) {
            if (number.getAttribute('data-cartItem-id') === itemId) {
                number.value = parseInt(number.value) - 1;
                fetchAddQuantityToCart(productId, "odd");
                subtotalValue(itemId, number)
            }
        }
        if (parseInt(number.value) === 0) {
            fetchDeleteProductFromCart(`?productId=${productId}`)
        }
    })
}

function subtotalValue(itemId, actualQuantityNumber) {
    const subValues = document.querySelectorAll(`.itemPriceSum`);
    const itemValues = document.querySelectorAll(`.itemPrice`);
    subValues.forEach(valueNumber => {
        itemValues.forEach(itemNumber => {
            if ((valueNumber.getAttribute('data-cartItem-id') === itemId && itemNumber.getAttribute('data-cartItem-id') === itemId)) {
                const newValue = parseFloat(itemNumber.innerHTML) * (parseFloat(actualQuantityNumber.value));
                valueNumber.innerHTML = newValue.toFixed(2);
            }
        })
    })
}


const formPersonalData = document.getElementById(`formData`);
const name = document.getElementById("name");
const lastName = document.getElementById("lastName");
const email = document.getElementById('email');


if (formPersonalData) {
    formPersonalData.addEventListener("submit", async event => {
        event.preventDefault();

        const formDataNew = new FormData(formPersonalData);
        const data = {};
        formDataNew.forEach((value, key) => {
            data[key] = value;
        });
        const payload = JSON.stringify(data);
        console.log(payload);

        try {
            const res = await fetch(
                `http://localhost:8080/checkoutCart/personalData`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: payload
                })
                window.location.href = 'http://localhost:8080/payment';
        }catch(err)
    {
        console.log(err.message);
    }

})
}

const optionPayPal= document.getElementById(`pPal`);
const formPaymentDataPayPal = document.getElementById(`formPaypal`);

if (formPaymentDataPayPal && optionPayPal) {
    formPaymentDataPayPal.addEventListener("submit", async event => {
        event.preventDefault();

        const formDataNew = new FormData(formPaymentDataPayPal);
        const data = {};
        formDataNew.forEach((value, key) => {
            data[key] = value;
        });
        const payload = JSON.stringify(data);
        console.log(payload);

        try {
            const res = await fetch(
                `http://localhost:8080/payment/paymentData`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: payload
                })
            window.location.href = 'http://localhost:8080/';
        }catch(err)
        {
            console.log(err.message);
        }

    })
}


const optionPCreditCard= document.getElementById(`creditC`);
const formPaymentDataCreditCard = document.querySelector(`.creditCard`);

if (formPaymentDataCreditCard && optionPCreditCard) {
    formPaymentDataCreditCard.addEventListener("submit", async event => {
        event.preventDefault();

        const formDataNew = new FormData(formPaymentDataCreditCard);
        const data = {};
        formDataNew.forEach((value, key) => {
            data[key] = value;
        });
        const payload = JSON.stringify(data);
        console.log(payload);

        try {
            const res = await fetch(
                `http://localhost:8080/payment/paymentData`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: payload
                })

            window.location.href = 'http://localhost:8080/';
        }catch(err)
        {
            console.log(err.message);
        }
    })
}


if (name) {
    validateFormDataName();
} else if (lastName) {
    validateFormDataLastName();
} else if (email) {
    validateFormDataEmail();
}

function validateFormDataName() {
    name.addEventListener("input", function () {
        const nameValue = name.value;
        if (nameValue === '') {
            const nameError = 'Should not be empty.';
            setError(name, nameError);
            setError(name, nameError);
        } else if (nameValue.match(/.*[0-9].*/)) {
            const nameError = 'Should not container a number';
            setError(name, nameError);
        } else {
            setError(name, "")
        }
    })
}

function validateFormDataLastName() {
    lastName.addEventListener("input", function () {
        const lastNameValue = lastName.value
        if (lastNameValue === '') {
            const lastNameError = 'Should not be empty.';
            setError(lastName, lastNameError);
        } else if (lastNameValue.match(/.*[0-9].*/)) {
            const lastNameError = 'Should not container a number';
            setError(lastName, lastNameError);
        } else {
            setError(lastName, '');
        }
    })
}

function validateFormDataEmail() {
    email.addEventListener("input", function () {
        const emailValue = email.value
        if (!/@/.test(emailValue)) {
            const emailError = 'The @ is necessary .';
            setError(email, emailError);
        } else {
            setError(email, '');
        }
    })
}

function setError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'personalData error';
}

const selectPayment = document.querySelector('.paymentOption');
if (selectPayment) {
    selectPayment.addEventListener("change", optionPayment);
}

function optionPayment(event) {
    const creditCard = document.querySelector('.creditCard')
    const paypalForm = document.querySelector('.paypalForm')
    const selectedOption = selectPayment.options[selectPayment.selectedIndex];
    const selectId = selectedOption.getAttribute('data-category-id');
    const buttonCreditCard = document.getElementById(`buttonCredit`);
    const buttonPayP = document.getElementById(`buttonPayPal`);
    event.preventDefault();
    if (selectId === "1") {
        paypalForm.style.display = 'block';
        creditCard.style.display = 'none';
        buttonPayP.style.display = 'block';
        buttonCreditCard.style.display = 'none';
    } else if (selectId === "2") {
        paypalForm.style.display = 'none';
        creditCard.style.display = 'block';
        buttonCreditCard.style.display = 'block';
        buttonPayP.style.display = 'none';
    }
}
