function registrarCarrito() {

	let carritoJSON = JSON.stringify(carrito);
	localStorage.setItem("carrito", carritoJSON);
	localStorage.setItem("total", aPagar);

}

function vaciarCarrito() {

	carrito = [];
	totalCarrito = [];
	aPagar = 0;
	contadorCarrito = 0;
	$(".contadorCarrito").text(contadorCarrito);
	$("#aPagar").html(aPagar);
	$(".tableBody").empty();
	localStorage.removeItem("carrito");
	localStorage.removeItem("total");
	$("[class^=cantidadProd]").val(1);
}

function recuperarCarrito() {


	if (localStorage.carrito !== undefined) {

		carrito = JSON.parse(localStorage.carrito);
		let carritoTabla = [];
		let carritoAcumulado = agruparSumar(carrito, ['id', 'producto'], ['cantidad', 'precio']);
		$.each(carritoAcumulado, function (index, elemento) {

			let {id, producto, cantidad, precio} = elemento;
			let items = [insertarFilaConProducto(id, producto, cantidad, precio)];
			carritoTabla.push(items);
		});
		actualizarTabla(carritoTabla);
		$("#aPagar").html((JSON.parse(localStorage.total)).toFixed(2));
		contadorCarrito = carrito.length;
		$(".contadorCarrito").text(contadorCarrito);
		totalCarrito = [parseFloat(JSON.parse(localStorage.total))];
	}
}

function finalizarCarrito() {

	if (usuarioActivo.length === 0) {

		btnConfirmarCompra.hide();
		AlertaRegistroCompra.html("Debes estar registrado para poder finalizar la compra.");


	} else if (aPagar === 0 || totalCarrito.length === 0) {

		btnConfirmarCompra.hide();
		AlertaRegistroCompra.html("Debes tener al menos 1 producto en el carrito para poder finalizar la compra.");


	} else {

		btnConfirmarCompra.show();
		AlertaRegistroCompra.html(`${usuarioActivo['nombre']}, ¿Deseas confirmar el pedido? Presiona 'Finalizar' para terminar tu compra o 'Cerrar' para continuar agregando productos al carrito.`);

	}
}

function compraConfirmada() {

	pedidoRealizado = agruparSumar(carrito, ['id', 'producto'], ['cantidad', 'precio']);
	pedidoRealizado.push(usuarioActivo);
	let precioFinal = ingresaTotalYEnvio();
	pedidoRealizado.push(precioFinal);
	let numeroPedido = {
		PedidoID: (Math.floor(Math.random() * 20000) + 10000)
	};
	pedidoRealizado.push(numeroPedido);
	if (localStorage.PedidosFinalizados === undefined) {

		let pedidoRealizadoJSON = JSON.stringify([pedidoRealizado]);
		localStorage.setItem("PedidosFinalizados", pedidoRealizadoJSON);

	} else {

		let recuperarPedidosJson = JSON.parse(localStorage.PedidosFinalizados);
		let listarPedidosCompletos = [pedidoRealizado].concat(recuperarPedidosJson);
		let pedidoAcumuladoJSON = JSON.stringify(listarPedidosCompletos);
		localStorage.setItem("PedidosFinalizados", pedidoAcumuladoJSON);
	}
	btnConfirmarCompra.hide();
	datoFinalCompra.html(`
			<p style="text-align: left;">${usuarioActivo['nombre']}:</p>
			<p style="text-align: justify;">El total a pagar es <span class="text-success" style="font-weight: bold;">$${precioFinal['totalAPagar']}</span> (${precioFinal['envioDomicilio']} a domicilio incluido). Enviamos un correo a tu casilla: <span class="text-primary">${usuarioActivo['email']}</span> para continuar el proceso de compra.</p>
			<p style="text-align: justify;">Podrás abonar con cualquiera de los siguientes medios de pago:</p>
			<img src="media/mediospago.png" class="mediosPago"> 
			<p>Tu pedido ha sido registrado con el <span style="color: orangered;font-weight: bold;">ID N° ${numeroPedido['PedidoID']}</span>.</p> 
			<p>Muchas gracias por elegirnos!</p>
			<img src="media/banner_logo.png" class="mediosPago"> 
			
	`);
	$("#CompraExitosa").modal("show");
	checkEnvio.prop('checked', false);
	mostrarImporteEnvio();
	borrarFiltradoProductos();
	vaciarCarrito();
}