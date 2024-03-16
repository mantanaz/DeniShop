const sectionProductsEl = document.querySelector('.section-products');
const btnFilterByExpensiveItems = document.querySelector('#btnFilterByExpensiveItems')
const btnFilterByCheepItems = document.querySelector('#btnFilterByCheepItems')
const btnFilterByAlphabet = document.querySelector('#btnFilterByAlphabet')
const inputSearchEl = document.querySelector('#input-search')
const btnLogoutEl = document.querySelector('#btn-logout')
const cartValueEl = document.querySelector('.cart-value')


let products = [];
let categories =[];

const searchProducts = [];
const cart = [];

const drawProducts = (data) => {
    sectionProductsEl.innerHTML = data
        .map((item) => {
            return `<article class="products-card">
            <img src="${item.images[0]}" alt="">
            <h3>${item.title}<h3>
            <span>Price: </span>
            <span id="price">${item.price}$</span>
            <button id="add-to-cart" data-product-id="${item.id}"> Add to cart </button>
            </article>`;
        })
    .join('');

    const btnAddToCartEls = document.querySelectorAll('#btn-add-to-cart');

    btnAddToCartEls.forEach((e) => 
        item.addEventListener('click', handleBtnAddToCartClick));
};
 
const fetchProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=50');

        const data = await response.json();
        products = data.products;
        drawProducts(data.products);
        console.log(data);
           } catch (error) {
                console.log(error);
           }
         };
fetchProducts();

const fetchCategories = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');

        const data = await response.json();
        categories = data;
        // drawProducts(data.products);
        console.log(data);
           } catch (error) {
                console.log(error);
           }
         };
fetchCategories();

btnFilterByExpensiveItems.addEventListener('click',(e) => {
   const sortedProductsByMaxPrice = products.sort((a,b) => b.price - a.price)
   drawProducts(sortedProductsByMaxPrice);
});

btnFilterByCheepItems.addEventListener('click',(e) => {
    const sortedProductsByMinPrice = products.sort((a,b) => a.price - b.price)
    drawProducts(sortedProductsByMinPrice);
 });

btnFilterByAlphabet.addEventListener('click',(e) => {
    console.log(btnFilterByAlphabet)
    const sortedProduct = products.sort(function (a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
    
        return 0;
      })
    drawProducts(sortedProduct);
});

inputSearchEl.addEventListener('keyup', () => {
    const productCardsEl = document.querySelectorAll('.products-card');
    const searchValue = inputSearchEl.value.toLowerCase();
    productCardsEl.forEach((productCardsEl) => {
        const productText = productCardsEl.innerHTML.toLowerCase();
        const isMatch = productText.includes(searchValue);

        productCardsEl.style.display = isMatch ? 'block' : 'none';

    });
})

const logout = (e) => {
    localStorage.removeItem('user');
    window.location.href = '/';
};

const handleBtnAddToCartClick = (e) => {
    const productId = e.currentTarget.getAttribute("data-product-id");
    console.log( typeof productId);

    const product = products.find((item) => item.id === +productId);

    cart.push(product);
    console.log(cart);

    cartValueEl.textContent = cart.length;
    drawProducts(products);
};

const handleBtnRemoveFromCartClick = (e) => {
    const productId = e.currentTarget.getAttribute("data-product-id");

    const updatedCart = cart.filter((item) => itwm.id !== productId);

    drawProducts(products);
}

btnLogoutEl.addEventListener('click', logout)
