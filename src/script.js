document.addEventListener("DOMContentLoaded", function() {

    const itemGrid = document.getElementById('items-grid')
    const cartIcon = document.getElementById('cart-icon')
    const closeModalButton = document.getElementById('close-modal')

    cartIcon.addEventListener('click', () => {
        openModal()
    })

    closeModalButton.addEventListener('click', () => {
        closeModal()
    })

    const cart = []


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
        if( newCart.some(e => e.name === name)) {
            //add upper modal to top of page showing that this item has already been added. 
            const errorModal = document.getElementById('error-modal')
            errorModal.textContent = "This item has already been added to your cart."
            errorModal.classList.remove('-translate-y-20')
            setTimeout(() => {
                errorModal.classList.add('-translate-y-20')
            }, "2000")
            return
        }
        let newItem = {
            image: img, 
            name: name,  
            price: price, 
            quantity: 1
        }
        newCart.push(newItem)
        localStorage.setItem("cart", JSON.stringify(newCart))
        handleModalData(newCart)
    }

    function openModal() {
        const modal = document.getElementById('cart-modal')
        modal.classList.remove('translate-x-full')
    }

    function closeModal() {
        const modal = document.getElementById('cart-modal')
        modal.classList.add('translate-x-full')

    }

    const removeChildNodes = (parent) => {
       let children = parent.querySelectorAll('#cart-info')
        children.forEach(child => {
            child.parentNode.removeChild( child )
        })
    }

    function removeItemFromCart(name) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        const item = cart.findIndex(e => e.name === name)
        if(item > -1) {
            cart.splice(item, 1)
            localStorage.setItem("cart", JSON.stringify(cart))
            handleModalData(cart)
        }
    }

    function handleModalData(cart) {
        const cartModal = document.getElementById('cart-modal')
        removeChildNodes(cartModal)
        cart.forEach(item => {
            const div = document.createElement('div')
            div.setAttribute('id', 'cart-info')
            const infoDiv = document.createElement('div')
            div.classList.add('flex', 'flex-row', 'justify-start', 'items-center', 'gap-10')

            const name = document.createElement('p')
            name.classList.add('text-xl', 'font-bold')
            name.textContent = item.name

            const img = document.createElement('img')
            img.width = "50"
            img.height = "50"
            img.src = item.image
            img.alt = "Product Photo"

            const price = document.createElement('div')
            price.classList.add('text-primary', 'font-bold')
            price.textContent = item.price

            const button = document.createElement('button')
            button.classList.add('bg-primary', 'px-5', 'py-4', 'ml-8', 'border', 'text-white', 'rounded-xl', 'text-xl', 'transition-all', 'duration-150', 'hover:bg-accent', 'fa-solid', 'fa-trash')

            button.addEventListener('click', () => {
                removeItemFromCart(item.name)
            })
            
            infoDiv.append(name, price)
            div.append(img, infoDiv,button)
            cartModal.append(div)
        })
    }
});