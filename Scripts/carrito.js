// Guardar libro en localStorage
function guardarEnCarrito(libro) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(libro);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// Actualizar contador en menú
function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("carrito-count");
    if (contador) contador.textContent = carrito.length;
}

// Mostrar productos del carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-items");
    const totalDiv = document.getElementById("carrito-total");
    const botonPagar = document.querySelector(".btn");

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-carrito");
        itemDiv.innerHTML = `
            <p><strong>${item.titulo}</strong> - S/ ${item.precio.toFixed(2)}</p>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        contenedor.appendChild(itemDiv);
        total += item.precio;
    });

    totalDiv.innerHTML = `<h3>Total: S/ ${total.toFixed(2)}</h3>`;

    // Botones eliminar
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = parseInt(boton.getAttribute("data-index"));
            eliminarProducto(index);
        });
    });

    // Botón pagar
    botonPagar.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
        } else {
            alert("¡Pago realizado con éxito! Gracias por tu compra.");
            localStorage.removeItem("carrito");
            mostrarCarrito();
            actualizarContador();
        }
    });
}

// Eliminar un producto del carrito por su índice
function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContador();
}

// Cuando carga el DOM
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();

    // Captura los botones de añadir (si estamos en libros.html)
    const botones = document.querySelectorAll(".btn-añadir");
    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const libro = boton.closest(".book-item");
            const titulo = libro.querySelector(".titulo-libro").textContent;
            const precioTexto = libro.querySelector(".precio-libro").textContent;
            const precio = parseFloat(precioTexto.replace("S/", "").trim());

            guardarEnCarrito({ titulo, precio });
            alert(`"${titulo}" fue añadido al carrito.`);
        });
    });

    // Mostrar carrito (si estamos en carritocompras.html)
    if (document.getElementById("carrito-items")) {
        mostrarCarrito();
    }
});
