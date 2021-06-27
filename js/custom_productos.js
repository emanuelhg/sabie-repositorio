const validarCantMax = (IdProd, carrito) => carrito.filter((obj) => obj.id === IdProd).length;

const calculaTotalAPagar = (totalCarrito) => parseFloat(totalCarrito.reduce((a, b) => a + b, 0).toFixed(2));

function productoAgregado(id, producto, cantidad, precio, tipo) {
  return `
    <div><img src="./media/producto${ id }.png" style="width: 25%;margin-bottom: 1rem;"></div>
    Se agregó <span style="font-weight: bold;">${ producto }</span> - <span style="font-weight: bold;color: orangered;">Cantidad: ${ cantidad }</span> por <span style="font-weight: bold;color: green;">$${ (precio * cantidad).toFixed(2) }</span> a tu carrito.
    `;
}