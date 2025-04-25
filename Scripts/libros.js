document.addEventListener('DOMContentLoaded', () => {
    const bookGrid = document.getElementById('book-grid');
    const searchInput = document.getElementById('search-input');
    const carritoCountSpan = document.getElementById('carrito-count');

    // Simulación de la lista de libros (¡Reemplaza esto con tus datos reales!)
    const libros = [
        { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', portada: 'https://via.placeholder.com/100x150/FF0000/FFFFFF?Text=Cien', detalles: 'Más detalles sobre Cien años de soledad...', isbn: '978-0307350666' },
        { titulo: 'El amor en los tiempos del cólera', autor: 'Gabriel García Márquez', portada: 'https://via.placeholder.com/100x150/00FF00/FFFFFF?Text=Amor', detalles: 'Más detalles sobre El amor en los tiempos del cólera...', isbn: '978-0140265711' },
        { titulo: 'Rayuela', autor: 'Julio Cortázar', portada: 'https://via.placeholder.com/100x150/0000FF/FFFFFF?Text=Rayuela', detalles: 'Más detalles sobre Rayuela...', isbn: '978-0375705326' },
        // ... más libros
    ];

    let carritoCount = 0;

    function mostrarLibros(listaDeLibros) {
        bookGrid.innerHTML = '';
        listaDeLibros.forEach(libro => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <img src="${libro.portada}" alt="Portada de ${libro.titulo}">
                <h3>${libro.titulo}</h3>
                <p>Autor: ${libro.autor}</p>
                <button class="view-details-btn" data-libro-index="${libros.indexOf(libro)}">Ver detalles</button>
                <button class="add-to-cart-btn" data-titulo="${libro.titulo}">Añadir al carrito</button>
                <div class="details-card" id="details-card-${libros.indexOf(libro)}">
                    <h4>${libro.titulo}</h4>
                    <p>Autor: ${libro.autor}</p>
                    <p>${libro.detalles}</p>
                    <p>ISBN: ${libro.isbn}</p>
                    <button class="close-details-btn" data-libro-index="${libros.indexOf(libro)}">Cerrar</button>
                </div>
            `;
            bookGrid.appendChild(bookCard);
        });

        // Añadir event listeners para "Ver detalles"
        const detallesButtons = document.querySelectorAll('.view-details-btn');
        detallesButtons.forEach(button => {
            button.addEventListener('click', function() {
                const libroIndex = this.getAttribute('data-libro-index');
                const detailsCard = document.getElementById(`details-card-${libroIndex}`);
                detailsCard.style.display = 'block'; // Mostrar la tarjeta de detalles
            });
        });

        // Añadir event listeners para "Cerrar" en la tarjeta de detalles
        const closeButtons = document.querySelectorAll('.close-details-btn');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const libroIndex = this.getAttribute('data-libro-index');
                const detailsCard = document.getElementById(`details-card-${libroIndex}`);
                detailsCard.style.display = 'none'; // Ocultar la tarjeta de detalles
            });
        });

        // Añadir event listeners para "Añadir al carrito" (sin cambios en esta parte por ahora)
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tituloLibro = this.getAttribute('data-titulo');
                carritoCount++;
                actualizarCarritoCount();
                alert(`"${tituloLibro}" ha sido añadido al carrito.`);
            });
        });
    }

    window.searchBooks = function() {
        const searchTerm = searchInput.value.toLowerCase();
        const librosFiltrados = libros.filter(libro =>
            libro.titulo.toLowerCase().includes(searchTerm) ||
            libro.autor.toLowerCase().includes(searchTerm)
        );
        mostrarLibros(librosFiltrados);
    };

    function actualizarCarritoCount() {
        carritoCountSpan.textContent = carritoCount;
    }

    mostrarLibros(libros);
    actualizarCarritoCount();
});