document.addEventListener("DOMContentLoaded", function() {

    const itemGrid = document.getElementById('items-grid')
    const cartIcon = document.getElementById('cart-icon')
    const productsList = document.getElementById('products-list')
    const closeModalButton = document.getElementById('close-modal')

    cartIcon.addEventListener('click', () => {
        openModal()
    })

    closeModalButton.addEventListener('click', () => {
        closeModal()
    })

    const cart = []

    async function fetchItems() {
        const response = await fetch('https://api.npoint.io/751f82bed304ed7ad19f')
        const json = await response.json()
        handleCheckoutData()
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
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
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

    function handlePrice(cart) {
        //grab all prices from each object in the cart and add them. 
        let currentPrice = 0.00  
        cart.forEach(item  => {
            currentPrice += item.price
        })
        document.getElementById('total-price').textContent = '$' + currentPrice
    }

    function handleCheckoutData () {
        const productsDiv = productsList.children
        const checkoutContainer = document.getElementById('checkout-button-container')
        if(productsDiv.length === 0) {
            console.log('if called')
            productsList.classList.add('hidden')
            checkoutContainer.classList.add('hidden')
            document.getElementById('empty-cart').classList.remove('hidden')
        }
        else {
            console.log('else called')
            document.getElementById('empty-cart').classList.add('hidden')
            productsList.classList.remove('hidden')
            checkoutContainer.classList.remove('hidden')
        }
    }

    function handleModalData(cart) {
        const cartModal = document.getElementById('cart-modal')
        removeChildNodes(productsList)
        if(cart.length === 0 ) { 
            handleCheckoutData()
            return
        }
        cart.forEach(item => {
            const li = document.createElement('li'); 
            li.classList.add('flex', 'py-6')

            const imageContainer = document.createElement('div')
            imageContainer.classList.add('h-24', 'w-24', 'flex-shrink-0', 'overflow-hidden', 'rounded-md', 'border', 'border-gray-200' )

            const img = document.createElement('img')
            img.classList.add('h-full', 'w-full', 'object-cover', 'object-center')
            img.src = item.image
            img.alt = "Product Photo"
            imageContainer.append(img)

            const productDiv = document.createElement('div')
            productDiv.classList.add('ml-4', 'flex', 'flex-1', 'flex-col')

            const productDivWrapper = document.createElement('div')
            productDiv.append(productDivWrapper)

            const productInfo = document.createElement('div')
            productInfo.classList.add('flex', 'justify-between', 'text-base', 'font-medium', 'text-gray-900')

            const name = document.createElement('h3')
            name.textContent = item.name

            const price = document.createElement('p')
            price.classList.add('ml-4')
            price.textContent = item.price

            productInfo.append(name, price)
            productDivWrapper.append(productInfo)

            const productQuantityContainer = document.createElement('div')
            productQuantityContainer.classList.add('flex', 'flex-1', 'items-end', 'justify-between', 'text-sm')

            const quantity = document.createElement('p')
            quantity.classList.add('text-gray-500')

            productQuantityContainer.append(quantity)
            productDiv.append(productQuantityContainer)

            const removeButtonContainer = document.createElement('div')
            removeButtonContainer.classList.add('flex')

            const removeButton = document.createElement('button')
            removeButton.classList.add('font-medium', 'text-indigo-600', 'hover:text-indigo-500')
            removeButton.textContent = 'Remove'

            removeButtonContainer.append(removeButton)
            productQuantityContainer.append(removeButtonContainer)

            removeButton.addEventListener('click', () => {
                removeItemFromCart(item.name)
            })
            
            li.append(imageContainer, productDiv )
            productsList.append(li)
            handleCheckoutData()
            handlePrice(cart)
        })
    }
});