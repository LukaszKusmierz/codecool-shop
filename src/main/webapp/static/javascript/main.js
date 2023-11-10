const radioCategory = document.querySelector('.categoryRadio');
const buttonCategory =  document.querySelector('.buttonCategory');
const radioTablet = document.querySelector('#tablet');
const radioEarphones = document.querySelector('#earphones');
const radioLaptop = document.querySelector('#laptop')
radioCategory.style.display = "none";

buttonCategory.addEventListener("click", showCategory);
radioCategory.addEventListener("click", hideCategory);

radioTablet.addEventListener("click",  optionCategory);
radioEarphones.addEventListener("click",  optionCategory);
radioLaptop.addEventListener("click",  optionCategory)


function showCategory(event){
    const element = event.target;
    if(element) {
        radioCategory.style.display = "block";
        console.log("showCategory")
    }
}

function hideCategory(event) {
    const element = event.target;
    if(element) {
        radioCategory.style.display = "none";
        console.log("hideCategory")
    }
}

async function fetchCategory(route) {
    try {
        console.log("try fetch" + route)
        const toFetch =`http://localhost:8080/products/get${route}`
        console.log("Fetching from " + toFetch)

        await fetch(toFetch, {
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
    const element = event.target
    const categoryId = element.dataset.categoryId
    event.preventDefault();

    if (categoryId) {
        fetchCategory(`?categoryId=${categoryId}`)
    }
}

function renderCategory(products) {
    const productContainer = document.getElementById('products');
    const categoryNameContainer = document.getElementById('categoryName');

    if (categoryNameContainer){

    }

    categoryNameContainer.innerHTML='';

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
                        <p class="lead">${prod.id}</p>
                    </div>
                    <div class="card-text">
                        <a class="btn btn-success" href="#">Add to cart</a>
                    </div>
                </div>
            </div>
        `;
        productContainer.appendChild(card);

    });
}

