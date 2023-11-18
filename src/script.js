document.addEventListener("DOMContentLoaded", function() {

    const checkoutButton = document.querySelector('#checkout')
    const addToCartButton = document.querySelectorAll('.addToCart')
    const itemGrid = document.getElementById('items-grid')

    const cart = []

    async function fetchItems() {
        const response = await fetch('https://api.npoint.io/751f82bed304ed7ad19f')
        const json = await response.json()
        showItems(json)
    }

    fetchItems()
    function showItems(e) {
        console.log(e)
        e.forEach(item => {

            const newProductDiv = document.createElement('div')
            newProductDiv.classList.add('p-5')

            const productInfoDiv = document.createElement('div')
            productInfoDiv.classList.add('pt-2', 'flex', 'flex-col', 'gap-3')

            const img = document.createElement('img')
            img.width = "392"
            img.height = "400"
            img.src = item.image
            img.alt = "Prodcut Photo"

            const info = document.createElement('p')
            info.classList.add('text-xl', 'font-bold')

            const description = document.createElement('i')
            description.classList.add('font-light')

            const price = document.createElement('div')
            price.classList.add('text-primary', 'font-bold')

            const button = document.createElement('button')
            button.classList.add('bg-primary', 'px-5', 'py-2', 'w-1/2', 'border', 'text-white', 
            'rounded-xl', 'text-xl', 'transition-all', 'duration-150', 'hover:bg-accent')
            button.textContent = "Add to Cart"
            button.addEventListener('click', () => {
            handleStorage(item.name, item.size, item.price)
           })

            info.textContent = item.name
            description.textContent = item.description
            price.textContent = item.price
            productInfoDiv.append(img, info, description, price, button)
            newProductDiv.append(productInfoDiv)
            itemGrid.append(newProductDiv)
        })
    }
});