const sectionProductsEl = document.querySelector('.section-products');
const btnFilterByExpensiveItems = document.querySelector('#btnFilterByExpensiveItems')
const btnFilterByCheepItems = document.querySelector('#btnFilterByCheepItems')
const btnFilterByAlphabet = document.querySelector('#btnFilterByAlphabet')
const inputSearchEl = document.querySelector('#input-search')

let products = [];

const searchProducts = [];


const drawProducts = (data) => {
    sectionProductsEl.innerHTML = data
    .map((item) => {
    return `<article class="product-card">
    <img src="${item.images[0]}" alt="">
    <h3>${item.title}<h3>
    <span>${item.price}$</span>
    </article>`;
    })
    .join('');
};

const fetchData = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=10');

        const data = await response.json();
        products = data.products;
        drawProducts(data.products);
        console.log(data);
           } catch (error) {
                console.log(error);
           }
         };

fetchData();

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
    const productCardsEl = document.querySelectorAll('.product-card');
    const searchValue = inputSearchEl.value.toLowerCase();
    productCardsEl.forEach((productCardsEl) => {
        const productText = productCardsEl.innerHTML.toLowerCase();
        const isMatch = productText.includes(searchValue);

        productCardsEl.style.display = isMatch ? 'block' : 'none';

    });
})