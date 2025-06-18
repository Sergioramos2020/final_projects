 // Array de objetos que representa los productos disponibles en la tienda.
    // Cada objeto tiene un 'id' único, un 'name', un 'price' y la ruta de la 'image'.
    const products = [
      { id: 1, name: "Chaqueta Urbana", price: 60000, image: "img/producto2.jpg" },
      { id: 2, name: "Camiseta Oversize Jean", price: 70000, image: "img/producto1.jpg" },
      { id: 3, name: "Buzo Lana Alpaca", price: 90000, image: "img/producto19.jpg" },
      { id: 4, name: "Camiseta Urbana", price: 30000, image: "img/producto4.jpg" },
      { id: 5, name: "Camiseta Con Capucha Oversize", price: 60000, image: "img/producto5.jpg" },
      { id: 6, name: "Mocasines Derby", price: 95000, image: "img/producto29.jpg" },
      { id: 7, name: "Conjunto Dama", price: 120000, image: "img/producto7.jpg" },
      { id: 8, name: "Vestido Oversize Blanca", price: 80000, image: "img/producto8.jpg" },
      { id: 9, name: "Buzos Veraneros", price: 55000, image: "img/producto9.jpg" },
      { id: 10, name: "Chaqueta Urbana (2)", price: 120000, image: "img/producto18.jpg" },
      { id: 11, name: "Chaqueta Oversize", price: 60000, image: "img/producto11.jpg" },
      { id: 12, name: "Vestido Kuster", price: 90000, image: "img/producto12.jpg" },
      { id: 13, name: "Blazer Hombre", price: 120000, image: "img/producto17.jpg" },
      { id: 14, name: "Blazer Hombre Oversize", price: 350000, image: "img/producto16.jpg" },
      { id: 15, name: "Blusa en Malla para Mujer", price: 98000, image: "img/producto15.jpg" },
      { id: 16, name: "Chaqueta Urbana Lana", price: 120000, image: "img/producto14.jpg" },
      { id: 17, name: "Vestidos Arturo Calle", price: 150000, image: "img/producto13.jpg" },
      { id: 18, name: "Camisas Custer", price: 90000, image: "img/producto10.jpg" },
      { id: 19, name: "Zapatos Gravity Force", price: 250000, image: "img/producto27.jpg" },
      { id: 20, name: "Mocasines UnderBowl", price: 300000, image: "img/producto28.jpg" },
      { id: 21, name: "Jordán", price: 180000, image: "img/producto26.jpg" },
      { id: 22, name: "Pantalón Urbano", price: 120000, image: "img/producto21.jpg" },
      { id: 23, name: "Gorras New Era", price: 90000, image: "img/producto22.jpg" },
      { id: 24, name: "Zapatos Jelly Platform", price: 120000, image: "img/producto24.jpg" },
    ];

    // Variable global 'cart' que almacenará los productos que el usuario ha añadido al carrito.
    // Inicialmente es un array vacío.
    let cart = [];

    /**
     * function saveCart
     * description Guarda el estado actual del array "cart" en el almacenamiento local (localStorage) del navegador.
     * Esto permite que el carrito persista incluso si el usuario cierra y vuelve a abrir la página.
     * Convierte el array "cart" a una cadena JSON antes de guardarlo.
     */
    function saveCart() {
      localStorage.setItem('urbanstyles_cart', JSON.stringify(cart));
    }

    /**
     * function loadCart
     * description Carga el carrito de compras desde el almacenamiento local (localStorage).
     * Si encuentra datos de un carrito previamente guardado, los parsea de JSON a un objeto JavaScript
     * y los asigna a la variable `cart`. Luego, actualiza el contador del carrito y la visualización del mismo.
     */
    function loadCart() {
      const storedCart = localStorage.getItem('urbanstyles_cart');
      if (storedCart) {
        cart = JSON.parse(storedCart); // Convierte la cadena JSON de vuelta a un array de objetos
      }
      updateCartCounter(); // Actualiza el número de ítems en el ícono del carrito
      updateCartDisplay(); // Actualiza la tabla del carrito en el modal
    }

    /**
     * function displayProducts
     * description Muestra los productos disponibles en la sección de productos de la página.
     * Itera sobre el array `products` y crea una tarjeta HTML para cada producto,
     * insertándolas en el elemento con el ID 'product-list'.
     */
    function displayProducts() {
      const productList = document.getElementById('product-list'); // Obtiene el contenedor de productos
      productList.innerHTML = ''; // Limpia cualquier contenido existente en el contenedor para evitar duplicados
      products.forEach(product => {
        // Crea una plantilla de cadena (template literal) para la tarjeta de cada producto
        const productCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price.toLocaleString('es-CO')}</p> <button class="button-car" onclick="addToCart(${product.id})"> Agregar <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        `;
        productList.innerHTML += productCard; // Agrega la tarjeta del producto al contenedor
      });
    }

    /**
     * function addToCart
     * description Agrega un producto al carrito de compras.
     * Si el producto ya existe en el carrito, incrementa su cantidad.
     * Si no existe, lo añade como un nuevo ítem con cantidad 1.
     * Después de modificar el carrito, lo guarda en localStorage y actualiza la UI.
     * param {number} productId - El ID del producto a agregar al carrito.
     */
    function addToCart(productId) {
      // Busca el producto en el array 'products' por su ID
      const product = products.find(p => p.id === productId);
      if (product) {
        // Busca si el producto ya existe en el carrito
        const existingCartItem = cart.find(item => item.id === productId);
        if (existingCartItem) {
          // Si el producto ya está en el carrito, incrementa su cantidad
          existingCartItem.quantity++;
        } else {
          // Si el producto no está en el carrito, lo añade con una cantidad de 1
          cart.push({ ...product, quantity: 1 }); // Usa el operador spread para copiar las propiedades del producto y añadir 'quantity'
        }
        saveCart();           // Guarda el estado actualizado del carrito en localStorage
        updateCartCounter();  // Actualiza el número en el ícono del carrito
        updateCartDisplay();  // Actualiza la tabla de ítems del carrito en el modal
        alert(`${product.name} ha sido añadido al carrito.`); // Muestra una alerta de confirmación
      }
    }

    /**
     * function removeFromCart
     * description Reduce la cantidad de un producto en el carrito o lo elimina si su cantidad es 1.
     * param {number} productId - El ID del producto a remover o cuya cantidad se va a disminuir.
     */
    function removeFromCart(productId) {
      // Encuentra el índice del producto en el array 'cart'
      const productIndex = cart.findIndex(item => item.id === productId);
      if (productIndex > -1) { // Verifica si el producto fue encontrado en el carrito
        if (cart[productIndex].quantity > 1) {
          // Si la cantidad del producto es mayor a 1, solo decrementa la cantidad
          cart[productIndex].quantity--;
        } else {
          // Si la cantidad es 1, elimina el producto completamente del carrito
          cart.splice(productIndex, 1); // Elimina 1 elemento desde la posición 'productIndex'
        }
        saveCart();           // Guarda el carrito actualizado
        updateCartCounter();  // Actualiza el contador del carrito en la navegación
        updateCartDisplay();  // Actualiza la visualización del carrito en el modal
      }
    }

    /**
     * function emptyCart
     * description Vacía completamente el carrito de compras.
     * Pide confirmación al usuario antes de proceder.
     */
    function emptyCart() {
      // Muestra una ventana de confirmación al usuario
      if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = []; // Reinicia el array 'cart' a un array vacío
        saveCart();           // Guarda el carrito vacío en localStorage
        updateCartCounter();  // Actualiza el contador del carrito a 0
        updateCartDisplay();  // Actualiza la visualización del carrito para mostrar que está vacío
        alert('El carrito ha sido vaciado.'); // Muestra una alerta de confirmación
      }
    }

    /**
     * function updateCartDisplay
     * description Actualiza la tabla de productos dentro del modal del carrito de compras
     * y el total del carrito.
     */
    function updateCartDisplay() {
      const cartItemsContainer = document.getElementById('cart-items'); // Obtiene el tbody de la tabla del carrito
      const cartTotalElement = document.getElementById('cart-total');   // Obtiene el elemento que muestra el total
      let total = 0; // Inicializa el total del carrito

      cartItemsContainer.innerHTML = ''; // Limpia el contenido actual de la tabla del carrito

      if (cart.length === 0) {
        // Si el carrito está vacío, muestra un mensaje en la tabla
        cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center">El carrito está vacío.</td></tr>';
      } else {
        // Si hay productos en el carrito, itera sobre ellos para mostrarlos
        cart.forEach(item => {
          const itemTotal = item.price * item.quantity; // Calcula el subtotal para cada ítem
          total += itemTotal; // Suma al total general del carrito

          // Crea una fila HTML para cada ítem del carrito
          const cartRow = `
            <tr>
              <td>${item.name}</td>
              <td>$${item.price.toLocaleString('es-CO')}</td>
              <td>
                <button class="btn btn-sm btn-outline-secondary" onclick="removeFromCart(${item.id})">-</button>
                ${item.quantity}
                <button class="btn btn-sm btn-outline-secondary" onclick="addToCart(${item.id})">+</button>
              </td>
              <td>$${itemTotal.toLocaleString('es-CO')}</td>
              <td><button class="btn btn-danger btn-sm" onclick="removeItemCompletely(${item.id})">Eliminar</button></td> </tr>
          `;
          cartItemsContainer.innerHTML += cartRow; // Añade la fila al cuerpo de la tabla del carrito
        });
      }
      // Actualiza el texto del total del carrito con el valor calculado, formateado como moneda local
      cartTotalElement.textContent = total.toLocaleString('es-CO');
    }

    /**
     * function removeItemCompletely
     * description Elimina un producto por completo del carrito, sin importar su cantidad.
     * param {number} productId - El ID del producto a eliminar.
     */
    function removeItemCompletely(productId) {
      // Encuentra el índice del producto en el array 'cart'
      const productIndex = cart.findIndex(item => item.id === productId);
      if (productIndex > -1) { // Verifica si el producto fue encontrado
        const removedItemName = cart[productIndex].name; // Guarda el nombre del producto para la alerta
        cart.splice(productIndex, 1); // Elimina 1 elemento desde la posición 'productIndex'
        saveCart();           // Guarda el carrito actualizado
        updateCartCounter();  // Actualiza el contador del carrito
        updateCartDisplay();  // Actualiza la visualización del carrito
        alert(`${removedItemName} ha sido eliminado completamente del carrito.`); // Alerta de confirmación
      }
    }

    /**
     * function updateCartCounter
     * description Actualiza el número de productos en el contador del carrito
     * que se muestra en la barra de navegación.
     */
    function updateCartCounter() {
      const cartCounterElement = document.getElementById('cart-counter'); // Obtiene el elemento del contador
      // Calcula el total de ítems sumando las cantidades de todos los productos en el carrito
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCounterElement.textContent = totalItems; // Actualiza el texto del contador
    }

    // Event listeners al cargar la página
    // 'DOMContentLoaded' asegura que el HTML está completamente cargado antes de ejecutar el script.
    document.addEventListener('DOMContentLoaded', () => {
      loadCart();      // Carga el carrito guardado al iniciar la página
      displayProducts(); // Muestra todos los productos disponibles en la página
    });