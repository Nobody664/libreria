document.addEventListener('DOMContentLoaded', () => {
    const carritoCountSpan = document.getElementById('carrito-count');
    let carritoCount = 0;

    // Función para actualizar el contador del carrito
    function actualizarCarritoCount() {
        carritoCountSpan.textContent = carritoCount;
    }

    // Añadir al carrito
    const addToCartButtons = document.querySelectorAll('.btn-añadir');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            carritoCount++;
            actualizarCarritoCount();
            alert(`"${this.closest('.book-item').dataset.titulo}" ha sido añadido al carrito.`);
        });
    });

    // Función para mostrar los detalles del libro
    const viewDetailsButtons = document.querySelectorAll('.btn-ver-detalles');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            const detailsCard = document.getElementById(`details-card-${bookId}`);
            detailsCard.style.display = 'block'; // Mostrar la tarjeta de detalles
        });
    });

    // Función para cerrar los detalles del libro
    const closeDetailsButtons = document.querySelectorAll('.close-details-btn');
    closeDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            const detailsCard = document.getElementById(`details-card-${bookId}`);
            detailsCard.style.display = 'none'; // Ocultar la tarjeta de detalles
        });
    });

    // Inicializar el contador del carrito
    actualizarCarritoCount();
});
