document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn-añadir");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const tarjeta = boton.closest(".book-item");

            const libro = {
                id: tarjeta.dataset.id,
                titulo: tarjeta.dataset.titulo,
                precio: tarjeta.dataset.precio
            };

            // Obtener carrito actual o inicializar
            let carrito = JSON.parse(localStorage.getItem("carritoLibros")) || [];

            // Añadir libro al carrito
            carrito.push(libro);

            // Guardar en localStorage
            localStorage.setItem("carritoLibros", JSON.stringify(carrito));

            // Actualizar contador en la barra de navegación
            document.getElementById("carrito-count").textContent = carrito.length;
        });
    });

    // Mostrar contador si ya hay libros guardados
    const carritoGuardado = JSON.parse(localStorage.getItem("carritoLibros")) || [];
    document.getElementById("carrito-count").textContent = carritoGuardado.length;
});

