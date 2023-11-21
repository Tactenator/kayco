document.addEventListener("DOMContentLoaded", function() {

    const itemGrid = document.getElementById('items-grid')
    const cartIcon = document.getElementById('cart-icon')

    cartIcon.addEventListener('click', () => {
        openModal()
    })

    const cart = []
    let open = false; 

    localStorage.setItem("cart", cart)

    async function fetchItems() {
        const response = await fetch('https://api.npoint.io/751f82bed304ed7ad19f')
        const json = await response.json()
        showItems(json)
    }

    localStorage.setItem("cart", cart)

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

            const name = document.createElement('p')
            name.classList.add('text-xl', 'font-bold')

            const description = document.createElement('i')
            description.classList.add('font-light')

            const price = document.createElement('div')
            price.classList.add('text-primary', 'font-bold')

            const button = document.createElement('button')
            button.classList.add('bg-primary', 'px-5', 'py-2', 'w-1/2', 'border', 'text-white', 
            'rounded-xl', 'text-xl', 'transition-all', 'duration-150', 'hover:bg-accent')
            button.textContent = "Add to Cart"

            button.addEventListener('click', () => {
                handleStorage(item.image, item.name, item.price)
           })

            name.textContent = item.name
            description.textContent = item.description
            price.textContent = item.price

            productInfoDiv.append(img, name, description, price, button)
            newProductDiv.append(productInfoDiv)
            itemGrid.append(newProductDiv)
        })
    }

    function handleStorage(img, name, price) {
        let newCart = JSON.parse(localStorage.getItem("cart") || "[]");
        let newItem = {
            image: img, 
            name: name,  
            price: price, 
            quantity: 1
        }
        newCart.push(newItem)
        localStorage.setItem("cart", JSON.stringify(newCart))
        console.log(newCart)
        handleModalData(newCart)
    }

    function openModal() {
        const modal = document.getElementById('cart-modal')
        if(!open){
            modal.classList.remove('translate-x-full')
            open = true
        }
        else {
            modal.classList.add('translate-x-full')
            open = false; 
        }
    }

    function handleModalData(cart) {
        console.log('Handle Modal Data Called')
    }
});