document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoCountSpan = document.getElementById('carrito-count');

    function actualizarCarritoVisual() {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        carritoCountSpan.textContent = totalItems;
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

    actualizarCarritoVisual();
});
