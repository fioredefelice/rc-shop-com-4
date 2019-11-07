const shop = (() => {
    const key = 'productsInCart'
    const url = 'http://localhost:3000/products';
    //Funcion para agregar los productos al carrito 
    const addToCart = () => {
        const prodRequest = getProduct(id);
        prodRequest.then(prod => {
            // console.log(prod);
            prod.quantity = 1;
            let local = localStorage.getItem(key);
            if (local) {
                var a = [];
                a = JSON.parse(localStorage.getItem(key));
                a.push(prod)
                // console.log(a);
                localStorage.setItem(key, JSON.stringify(a));
                // console.log(prod);
            }
            else {
                setItem(key, [prod]);
                // console.log(prod);
            }
        })
        const timer2 = () => {       
            const random = new Promise((resolve, reject) => {            
                setTimeout(() => {
                    resolve(location.href= 'cart.html');
                }, 1000);
            });
            return random;
        }
        timer2();
    };

    const getProducts = () => {
        const requestProducts = fetch(url);
        return requestProducts.then(response => {
            const r =response.json();
            return r.then(products => {
                return products;
            });
        });
    }

    const getProduct = id => {
        console.log(id);
        const requestProducts = fetch(`${url}/${id}`);
        return requestProducts.then(response => {
            const r =response.json();
            return r.then(products => {
                return products;
            });
        });
    }
    // Modifica los productos en el carrito
    const modifyFromCart = (itemId, _quantity) => {
        const inLocalStoreProducts = getItem(key);
        for (let i = 0; i < inLocalStoreProducts.length; i++) {
            if (inLocalStoreProducts[i].id === itemId) {
                inLocalStoreProducts[i].quantity = parseInt(_quantity);
            }
        }
        setItem(key, inLocalStoreProducts);
    }
    // Borra productos en el carrito
    const removeFromCart = (itemId) => {
        const inLocalStoreProducts = getItem(key);
        for (let i = 0; i < inLocalStoreProducts.length; i++) {
            if (inLocalStoreProducts[i].id === itemId) {
                inLocalStoreProducts[i].splice(i, 1);
            }
        }
        setItem(key, inLocalStoreProducts);
    }
    // Verifica el proceso de finalizacion de compra
    const doCheckout = () => {
        const products = getItem(key)
        return products;
    }
    const getItem = () => {
        console.log(key);
        let item = JSON.parse(localStorage.getItem(key));
        console.log(item);
        return item;
    }
    const setItem = (key, value) => {
        let item = JSON.stringify(value);
        localStorage.setItem(key, item);
    }
    return {
        addToCart,
        modifyFromCart,
        getItem,
        removeFromCart,
        doCheckout,
        getProduct,
        getProducts
    }
})();

