document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];
    const carritoCountSpan = document.getElementById('carrito-count');
    const carritoItemsDiv = document.getElementById('carrito-items'); 
    const carritoTotalSpan = document.getElementById('carrito-total');

    function actualizarCarritoVisual() {
        carritoCountSpan.textContent = carrito.length;
        carritoItemsDiv.innerHTML = '';

        let total = 0;
        carrito.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carrito-item');
            itemDiv.innerHTML = `
                <span>${item.titulo}</span>
                <span>$${item.precio.toFixed(2)}</span>
                <span>Cantidad: ${item.cantidad}</span>
                <button class="eliminar-item" data-id="${item.id}">Eliminar</button>
            `;
            carritoItemsDiv.appendChild(itemDiv);
            total += item.precio * item.cantidad;
        });

        carritoTotalSpan.textContent = `$${total.toFixed(2)}`;

        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAlCarrito(libroInfo) {
        const libroExistente = carrito.find(item => item.id === libroInfo.id);

        if (libroExistente) {
            libroExistente.cantidad++;
        } else {
            carrito.push({ ...libroInfo, cantidad: 1 });
        }
        actualizarCarritoVisual();
    }

    const botonesAgregar = document.querySelectorAll('.add-to-cart');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const libroItem = e.target.closest('.book-item');
            const libroInfo = {
                id: libroItem.dataset.id,
                titulo: libroItem.dataset.titulo,
                precio: parseFloat(libroItem.dataset.precio)
            };
            agregarAlCarrito(libroInfo);
        });
    });

    carritoItemsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-item')) {
            const libroId = e.target.dataset.id;
            const index = carrito.findIndex(item => item.id === libroId);
            if (index > -1) {
                carrito.splice(index, 1);
                actualizarCarritoVisual();
            }
        }
    });

    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito.push(...JSON.parse(carritoGuardado));
        actualizarCarritoVisual();
    }

    actualizarCarritoVisual();
    
});

