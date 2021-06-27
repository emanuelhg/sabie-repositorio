function ingresarProducto(ProductoSeleccionado) {

	let {id, producto, precio} = ProductoSeleccionado;
	let cantidad = parseInt($(`.cantidadProd${ id }`).val());
	let carritoTabla = [];
	let cantActual = validarCantMax(id, carrito);
	let validaStock = cantidad + cantActual


	if (cantActual < 10 && validaStock <= 10) {

		for (i = 0; i < cantidad; i++) {

			carrito.push(ProductoSeleccionado);
			totalCarrito.push(precio);
			contadorCarrito += +1;

		}
		aPagar = calculaTotalAPagar(totalCarrito);
		$("#aPagar").html(aPagar.toFixed(2));
		avisoProducto.empty();
		avisoProducto.append(productoAgregado(id, producto, cantidad, precio));
		$("#modalProducto").modal("show");
		$(`.cantidadProd${ id }`).val(1)
		$(".contadorCarrito").text(contadorCarrito);
		let carritoAcumulado = agruparSumar(carrito, ['id', 'producto'], ['cantidad', 'precio']);
		$.each(carritoAcumulado, function (index, elemento) {

			let {id, producto, cantidad, precio} = elemento;
			let items = [insertarFilaConProducto(id, producto, cantidad, precio)];
			carritoTabla.push(items);
		});
		actualizarTabla(carritoTabla);
		registrarCarrito();
	} else {
		avisoProducto.empty();
		avisoProducto.append(`
			Para garantizar el stock <span style="font-style: italic;">limitamos la cantidad de un mismo producto hasta 10 unidades por compra</span>. Actualmente <span style="text-decoration: underline;">posees ${cantActual}</span>. Revisa y agrega nuevamente.
		`)
		$("#modalProducto").modal("show");
		$(`.cantidadProd${ id }`).val(10 - cantActual);
	}
}

function eliminarProducto(idProducto) {

	carrito = carrito.filter(item => item.id !== idProducto)
	totalCarrito = [];
	carrito.forEach(valor => {
		totalCarrito.push(valor["precio"]);
	});
	aPagar = calculaTotalAPagar(totalCarrito);
	$("#aPagar").html(aPagar.toFixed(2));
	registrarCarrito();
	$(".tableBody").empty();
	recuperarCarrito();
	contadorCarrito = carrito.length;
	$(".contadorCarrito").text(contadorCarrito);
	$(`.cantidadProd${ idProducto }`).val(1);
}









