// Cargar los productos desde el localStorage
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carritoLibros")) || [];
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  listaCarrito.innerHTML = ""; // Limpiar el carrito antes de cargar

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalCarrito.innerHTML = "Total: S/ 0.00";
  } else {
    let total = 0;
    carrito.forEach((libro, index) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto-carrito");

      productoDiv.innerHTML = `
        <img src="/Imagenes/image${index + 1}.jpg" alt="${libro.titulo}">
        <div class="detalle-producto">
          <h3>${libro.titulo}</h3>
          <p>Precio: S/ ${libro.precio}</p>
        </div>
        <div class="precio">S/ ${libro.precio}</div>
        <button class="btn-eliminar" data-index="${index}">Eliminar</button>
      `;
      listaCarrito.appendChild(productoDiv);
      total += libro.precio;
    });

    totalCarrito.innerHTML = `Total: S/ ${total.toFixed(2)}`;

    // Agregar funcionalidad al botón de eliminar
    const btnEliminar = document.querySelectorAll(".btn-eliminar");
    btnEliminar.forEach((btn) => {
      btn.addEventListener("click", function() {
        const index = btn.getAttribute("data-index");
        eliminarProducto(index);
      });
    });
  }
}

// Eliminar un producto del carrito
function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem("carritoLibros")) || [];
  carrito.splice(index, 1); // Eliminar el producto en la posición indicada
  localStorage.setItem("carritoLibros", JSON.stringify(carrito)); // Guardar los cambios en localStorage
  cargarCarrito(); // Recargar el carrito
}

// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", function() {
  localStorage.removeItem("carritoLibros");
  cargarCarrito(); // Recargar carrito vacío
});

// Finalizar compra
document.getElementById("pagar").addEventListener("click", function() {
  alert("Proceso de pago simulado. ¡Gracias por tu compra!");
  localStorage.removeItem("carritoLibros");
  cargarCarrito(); // Recargar carrito vacío
});

// Cargar carrito al cargar la página
window.onload = cargarCarrito;
