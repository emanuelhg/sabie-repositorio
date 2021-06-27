function abrirRegistro() {

  $("#registroUsuario").modal("show");

}

function bajarAlCarrito() {

  $('html, body').animate({
    scrollTop: $("#carritoBottom").offset().top
  });

}

function refuerzaMinyMaX(cant) {
  if (cant.value != "") {
    if (parseInt(cant.value) < parseInt(cant.min)) {
      cant.value = cant.min;
    }
    if (parseInt(cant.value) > parseInt(cant.max)) {
      cant.value = cant.max;
    }
  }
}

function filtrarProductos(categoria) {
  $(".listadoProductos").html("");
  $(".listadoProductos").append(iniProductos);
  $('.contenedorCard').not(categoria).remove();
}