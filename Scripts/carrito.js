// Función para guardar en localStorage
function guardarEnCarrito(libro) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(libro);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// Función para actualizar contador en el menú
function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("carrito-count").textContent = carrito.length;
}

// Capturar botones de añadir al carrito en libros.html
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();

    const botones = document.querySelectorAll(".btn-añadir");
    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const libro = boton.closest(".libro");
            const titulo = libro.querySelector(".titulo-libro").textContent;
            const precioTexto = libro.querySelector(".precio-libro").textContent;
            const precio = parseFloat(precioTexto.replace("S/", "").trim());

            guardarEnCarrito({ titulo, precio });
            alert(`"${titulo}" fue añadido al carrito.`);
        });
    });

    // Si estamos en carritocompras.html
    if (document.getElementById("carrito-items")) {
        mostrarCarrito();
    }
});

// Mostrar los elementos del carrito en carritocompras.html
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
        `;
        contenedor.appendChild(itemDiv);
        total += item.precio;
    });

    totalDiv.innerHTML = `<h3>Total: S/ ${total.toFixed(2)}</h3>`;

    botonPagar.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
        } else {
            alert("¡Pago realizado con éxito! Gracias por tu compra.");
            localStorage.removeItem("carrito");
            contenedor.innerHTML = "";
            totalDiv.innerHTML = "";
            actualizarContador();
        }
    });
}
